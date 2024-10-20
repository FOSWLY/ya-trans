import BaseProvider from "./base.js";
import config from "../config/config.js";
import { DetectEmptyLangError, DetectError, GetLangsError, ProviderError, TranslateError, } from "../errors.js";
export default class YandexBrowserProvider extends BaseProvider {
    apiUrlPlaceholder = "https://browser.translate.yandex.net/api/v1/tr.json";
    originPlaceholder = "https://youtube.com";
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": config.userAgent,
    };
    srv = "browser_video_translation";
    constructor(options = {}) {
        super(options);
        this.updateData(options);
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
            body: body
                ? body
                : new URLSearchParams({
                    maxRetryCount: "2",
                    fetchAbortTimeout: "500",
                }),
            ...this.fetchOpts,
        };
    }
    getParams(params = {}) {
        return new URLSearchParams({
            srv: this.srv,
            ...params,
        }).toString();
    }
    getArrayParams(params) {
        return new URLSearchParams([["srv", this.srv], ...params]).toString();
    }
    isErrorRes(res, data) {
        return res.status > 399 || data.code > 399;
    }
    isSuccessProviderRes(res) {
        return res.success;
    }
    isMinimalResponse(data) {
        return Object.hasOwn(data, "code");
    }
    async request(path, body = null, headers = {}, method = "POST") {
        const options = this.getOpts(body, headers, method);
        try {
            const res = await this.fetch(`${this.apiUrl}${path}`, options);
            const data = (await res.json());
            if (!this.isMinimalResponse(data)) {
                return {
                    success: true,
                    data,
                };
            }
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
    async translate(text, lang = "en-ru") {
        if (!Array.isArray(text)) {
            text = [text];
        }
        const textArray = text.map((val) => [
            "text",
            val,
        ]);
        const params = this.getArrayParams([["lang", lang], ...textArray]);
        const res = await this.request(`/translate?${params}`);
        if (!this.isSuccessProviderRes(res)) {
            throw new TranslateError(res.data);
        }
        const { lang: resLang, text: resText = [""] } = res.data;
        return {
            lang: resLang,
            translations: resText,
        };
    }
    async detect(text) {
        const params = this.getParams({
            text,
        });
        const res = await this.request(`/detect?${params}`);
        if (!this.isSuccessProviderRes(res)) {
            throw new DetectError(res.data);
        }
        const { lang: resLang } = res.data;
        if (!resLang) {
            throw new DetectEmptyLangError(text);
        }
        return {
            lang: resLang,
            score: null,
        };
    }
    async getLangs() {
        const params = this.getParams();
        const res = await this.request(`/getLangs?${params}`);
        if (!this.isSuccessProviderRes(res)) {
            throw new GetLangsError(res.data);
        }
        return res.data.dirs;
    }
}
