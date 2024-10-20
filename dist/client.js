import { fetchWithTimeout } from "./utils/utils.js";
import { TranslationService, } from "./types/client.js";
import TranslationProvider from "./providers/index.js";
export default class TranslationClient {
    service;
    fetch;
    fetchOpts;
    apiUrl;
    apiKey;
    apiExtra;
    origin;
    headers = {};
    provider;
    constructor({ service = TranslationService.yandexbrowser, fetchFn = fetchWithTimeout, fetchOpts = {}, apiUrl = undefined, apiKey = undefined, apiExtra = undefined, origin = undefined, headers = {}, } = {}) {
        this.changeService({
            service,
            fetchFn,
            fetchOpts,
            apiUrl,
            apiKey,
            apiExtra,
            origin,
            headers,
        });
    }
    changeService({ service = this.service, fetchFn = this.fetch, fetchOpts = this.fetchOpts, apiUrl = this.apiUrl, apiKey = this.apiKey, apiExtra = this.apiExtra, origin = this.origin, headers = this.headers, } = {}) {
        this.service = service;
        this.fetch = fetchFn;
        this.fetchOpts = fetchOpts;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.apiExtra = apiExtra;
        this.headers = headers;
        this.origin = origin;
        this.provider = new TranslationProvider({
            fetchFn: this.fetch,
            fetchOpts: this.fetchOpts,
            apiUrl: this.apiUrl ?? undefined,
            apiKey: this.apiKey ?? undefined,
            apiExtra: this.apiExtra ?? undefined,
            origin: this.origin ?? undefined,
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
