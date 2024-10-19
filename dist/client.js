import { fetchWithTimeout } from "@/utils/utils";
import { TranslationService, } from "@/types/client";
import TranslationProvider from "@/providers";
export default class TranslationClient {
    service;
    fetch;
    fetchOpts;
    apiUrl;
    apiKey;
    apiExtra;
    headers = {};
    provider;
    constructor({ service = TranslationService.yandexbrowser, fetchFn = fetchWithTimeout, fetchOpts = {}, apiUrl = undefined, apiKey = undefined, apiExtra = undefined, headers = {}, } = {}) {
        this.changeService({
            service,
            fetchFn,
            fetchOpts,
            apiUrl,
            apiKey,
            apiExtra,
            headers,
        });
    }
    changeService({ service = this.service, fetchFn = this.fetch, fetchOpts = this.fetchOpts, apiUrl = this.apiUrl, apiKey = this.apiKey, apiExtra = this.apiExtra, headers = this.headers, } = {}) {
        this.service = service;
        this.fetch = fetchFn;
        this.fetchOpts = fetchOpts;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.apiExtra = apiExtra;
        this.headers = headers;
        this.provider = new TranslationProvider({
            fetchFn: this.fetch,
            fetchOpts: this.fetchOpts,
            apiUrl: this.apiUrl ?? undefined,
            apiKey: this.apiKey ?? undefined,
            apiExtra: this.apiExtra ?? undefined,
            headers: this.headers,
        }).getProvider(this.service);
    }
    async translate(text, lang = "en-ru") {
        return await this.provider.translate(text, lang);
    }
    async detect(text) {
        return await this.provider.detect(text);
    }
    async getLangs() {
        return await this.provider.getLangs();
    }
}
