import BaseProvider from "./base.js";
import { ProfanityAction, } from "../types/providers/msedge.js";
import { DetectError, GetLangsError, ProviderError, TranslateError, } from "../errors.js";
import { getTimestamp } from "../utils/utils.js";
export default class MSEdgeTranslateProvider extends BaseProvider {
    apiUrlPlaceholder = "https://api-edge.cognitive.microsofttranslator.com";
    sessionUrl = "https://edge.microsoft.com";
    originPlaceholder = "https://www.bing.com";
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
    };
    session = null;
    constructor(options = {}) {
        super(options);
        this.updateData(options);
    }
    async getSession() {
        const timestamp = getTimestamp();
        if (this.session &&
            this.session.creationTimestamp + this.session.maxAge > timestamp) {
            return this.session;
        }
        this.session = await this.createSession();
        return this.session;
    }
    getOpts(body, headers = {}, method = "POST") {
        return {
            method,
            headers: {
                ...this.headers,
                Referer: this.origin,
                Origin: this.origin,
                ...headers,
            },
            body,
            ...this.fetchOpts,
        };
    }
    getParams(params = {}) {
        return new URLSearchParams({
            "api-version": "3.0",
            ...params,
        }).toString();
    }
    isErrorRes(res, data) {
        return res.status > 399 || Object.hasOwn(data, "error");
    }
    isSuccessProviderRes(res) {
        return res.success;
    }
    async request(path, body = null, headers = {}, method = "POST") {
        const options = this.getOpts(body, headers, method);
        try {
            const res = await this.fetch(`${this.apiUrl}${path}`, options);
            const data = (await res.json());
            if (this.isErrorRes(res, data)) {
                throw new ProviderError(data.error?.message ?? res.statusText);
            }
            return {
                success: true,
                data,
            };
        }
        catch (err) {
            return {
                success: false,
                data: err?.message,
            };
        }
    }
    async createSession() {
        const options = this.getOpts(null, undefined, "GET");
        const res = await this.fetch(`${this.sessionUrl}/translate/auth`, options).catch(() => null);
        if (!res || res.status !== 200) {
            throw new ProviderError("Failed to request create session");
        }
        const token = await res.text();
        if (!token.includes(".")) {
            throw new ProviderError("The received token has an unknown format");
        }
        return {
            creationTimestamp: getTimestamp(),
            maxAge: 580,
            token,
        };
    }
    async rawTranslate(text, lang = "en-ru", profanityAction = ProfanityAction.NoAction, textType = "plain") {
        if (!Array.isArray(text)) {
            text = [text];
        }
        let [fromLang, toLang] = lang.split("-");
        if (!toLang) {
            toLang = fromLang;
            fromLang = this.baseLang;
        }
        const { token } = await this.getSession();
        const params = this.getParams({
            from: fromLang,
            to: toLang,
            textType,
            profanityAction,
        });
        const textArray = text.map((val) => ({ Text: val }));
        const res = await this.request(`/translate?${params}`, JSON.stringify(textArray), {
            Authorization: `Bearer ${token}`,
        });
        if (!this.isSuccessProviderRes(res)) {
            throw new TranslateError(res.data);
        }
        return {
            lang: `${fromLang}-${toLang}`,
            data: res.data,
        };
    }
    async translate(text, lang = "en-ru") {
        const res = await this.rawTranslate(text, lang);
        const translations = res.data.map((translationItem) => translationItem.translations[0].text);
        return {
            lang: res.lang,
            translations,
        };
    }
    async rawDetect(text) {
        if (!Array.isArray(text)) {
            text = [text];
        }
        const { token } = await this.getSession();
        const textArray = text.map((val) => ({ Text: val }));
        const params = this.getParams();
        const res = await this.request(`/detect?${params}`, JSON.stringify(textArray), {
            Authorization: `Bearer ${token}`,
        });
        if (!this.isSuccessProviderRes(res)) {
            throw new DetectError(res.data);
        }
        return res.data.map((detectItem) => ({
            ...detectItem,
            score: Math.round(detectItem.score * 100),
        }));
    }
    async detect(text) {
        const detectItem = await this.rawDetect(text);
        const { language: lang, score } = detectItem[0];
        return {
            lang,
            score,
        };
    }
    async getLangs() {
        const params = this.getParams({
            scope: "translation",
        });
        const res = await this.request(`/languages?${params}`, undefined, undefined, "GET");
        if (!this.isSuccessProviderRes(res)) {
            throw new GetLangsError(res.data);
        }
        return Object.keys(res.data.translation);
    }
}
