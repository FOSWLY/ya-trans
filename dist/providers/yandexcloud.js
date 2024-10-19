import { BaseProvider } from "./base.js";
import config from "@/config/config";
import { DetectEmptyLangError, DetectError, GetLangsError, ProviderError, TranslateError, } from "@/errors";
export default class YandexCloudProvider extends BaseProvider {
    apiOrigin = "https://cloud.yandex.ru/api/translate";
    origin = "https://cloud.yandex.ru";
    headers = {
        "Content-Type": "application/json",
        "User-Agent": config.userAgent,
    };
    baseLang = config.baseLang;
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
    isErrorRes(res, data) {
        return res.status > 399 || Object.hasOwn(data, "message");
    }
    isSuccessProviderRes(res) {
        return res.success;
    }
    async request(path, body = null, headers = {}, method = "POST") {
        const options = this.getOpts(body, headers, method);
        try {
            const res = await this.fetch(`${this.apiOrigin}${path}`, options);
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
    async translate(text, lang = "en-ru") {
        if (!Array.isArray(text)) {
            text = [text];
        }
        let [fromLang, toLang] = lang.split("-");
        if (!toLang) {
            toLang = fromLang;
            fromLang = this.baseLang;
        }
        const res = await this.request("/translate", JSON.stringify({
            sourceLanguageCode: fromLang,
            targetLanguageCode: toLang,
            texts: text,
        }));
        if (!this.isSuccessProviderRes(res)) {
            throw new TranslateError(res.data);
        }
        const translations = res.data.translations.map((translation) => translation.text);
        return {
            lang: `${fromLang}-${toLang}`,
            translations,
        };
    }
    async detect(text) {
        const res = await this.request("/detect", JSON.stringify({
            text,
            languageCodeHints: [],
        }));
        if (!this.isSuccessProviderRes(res)) {
            throw new DetectError(res.data);
        }
        const { languageCode: resLang } = res.data;
        if (!resLang) {
            throw new DetectEmptyLangError(text);
        }
        return {
            lang: resLang,
            score: null,
        };
    }
    async getLangs() {
        const res = await this.request(`/languages?baseLang=${this.baseLang}`, undefined, undefined, "GET");
        if (!this.isSuccessProviderRes(res)) {
            throw new GetLangsError(res.data);
        }
        const languageItems = res.data.languages;
        return languageItems
            .map((lang) => lang.code)
            .filter((lang) => lang !== this.baseLang);
    }
}
