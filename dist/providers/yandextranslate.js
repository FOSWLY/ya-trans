import BaseProvider from "./base.js";
import config from "../config/config.js";
import { DetectOptions, TranslateOptions, } from "../types/providers/yandextranslate.js";
import { DetectEmptyLangError, DetectError, GetLangsError, ProviderError, TranslateError, } from "../errors.js";
import { getTimestamp } from "../utils/utils.js";
export default class YandexTranslateProvider extends BaseProvider {
    MAX_UID = Number(10000000000000000000n);
    NANO_DIFF = 1000000;
    sessionUrl = "https://translate.yandex.ru/props/api/v1.0";
    apiUrlPlaceholder = "https://translate.yandex.net/api/v1/tr.json";
    originPlaceholder = "https://translate.yandex.ru";
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": config.userAgent,
    };
    session = null;
    constructor(options = {}) {
        super(options);
        this.updateData(options);
    }
    genYandexUID() {
        return BigInt(Math.floor(Math.random() * this.MAX_UID)).toString();
    }
    genYandexMetrikaUID() {
        return Math.floor(Date.now() * this.NANO_DIFF).toString();
    }
    getSecure(srv) {
        return {
            srv,
            yu: this.genYandexUID(),
            yum: this.genYandexMetrikaUID(),
        };
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
    getParams(srv, params = {}) {
        return new URLSearchParams({
            ...this.getSecure(srv),
            ...params,
        }).toString();
    }
    isErrorRes(res, data) {
        return res.status > 399 || Object.hasOwn(data, "message");
    }
    isSuccessProviderRes(res) {
        return res.success;
    }
    async request(path, body = null, headers = {}, method = "POST") {
        const options = this.getOpts(body, headers, method);
        try {
            const origin = path.includes("/sessions") ? this.sessionUrl : this.apiUrl;
            const res = await this.fetch(`${origin}${path}`, options);
            const data = (await res.json());
            if (this.isErrorRes(res, data)) {
                throw new ProviderError(data.message ?? res.statusText);
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
        const res = await this.request(`/sessions?${this.getParams("tr-text")}`);
        if (!this.isSuccessProviderRes(res)) {
            throw new ProviderError("Failed to request create session");
        }
        return res.data.session;
    }
    async rawTranslate(text, lang = "en-ru", options = TranslateOptions.default) {
        if (!Array.isArray(text)) {
            text = [text];
        }
        let [fromLang, toLang] = lang.split("-");
        if (!toLang) {
            toLang = fromLang;
            fromLang = this.baseLang;
        }
        const { id: sid } = await this.getSession();
        const params = this.getParams("tr-text", {
            sid: `${sid}-5-0`,
            source_lang: fromLang,
            target_lang: toLang,
            reason: "paste",
            format: "text",
            strategy: "0",
            disable_cache: "false",
            ajax: "1",
        });
        const textArray = text.map((val) => [
            "text",
            val,
        ]);
        const body = new URLSearchParams([
            ["options", options.toString()],
            ...textArray,
        ]);
        const res = await this.request(`/translate?${params}`, body);
        if (!this.isSuccessProviderRes(res)) {
            throw new TranslateError(res.data);
        }
        const { lang: resLang, text: resText = [""], align, detected } = res.data;
        return {
            lang: resLang,
            translations: resText,
            align,
            detected,
        };
    }
    async translate(text, lang = "en-ru") {
        const res = await this.rawTranslate(text, lang);
        const { lang: resLang, translations } = res;
        return {
            lang: resLang,
            translations,
        };
    }
    async rawDetect(text, options = DetectOptions.withCurrentProb) {
        const { id: sid } = await this.getSession();
        const params = this.getParams("tr-text", {
            sid,
            text,
            options,
        });
        const res = await this.request(`/detect?${params}`, undefined, undefined, "GET");
        if (!this.isSuccessProviderRes(res)) {
            throw new DetectError(res.data);
        }
        let { lang: resLang, probs, score } = res.data;
        if (!resLang) {
            throw new DetectEmptyLangError(text);
        }
        if (probs) {
            probs = Object.entries(probs).reduce((result, [key, val]) => {
                result[key] = Math.round(val * -100);
                return result;
            }, {});
        }
        if (score) {
            score = Math.round(score * -100);
        }
        return {
            lang: resLang,
            probs,
            score,
        };
    }
    async detect(text) {
        const { score, lang } = await this.rawDetect(text);
        return {
            lang,
            score,
        };
    }
    async getLangs() {
        const params = this.getParams("tr-text");
        const res = await this.request(`/getLangs?${params}`);
        if (!this.isSuccessProviderRes(res)) {
            throw new GetLangsError(res.data);
        }
        return res.data.dirs;
    }
}
