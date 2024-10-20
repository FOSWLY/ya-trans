import config from "../config/config.js";
import { NotSupportMethodError } from "../errors.js";
import { fetchWithTimeout } from "../utils/utils.js";
export default class BaseProvider {
    apiUrl;
    apiExtra;
    apiKey;
    origin;
    apiUrlPlaceholder = config.originPlaceholder;
    originPlaceholder = config.originPlaceholder;
    fetch;
    headers = {};
    fetchOpts;
    baseLang = config.baseLang;
    constructor({ fetchFn = fetchWithTimeout, fetchOpts = {}, apiUrl = this.apiUrlPlaceholder, apiExtra, apiKey, origin, headers = {}, } = {}) {
        this.fetch = fetchFn;
        this.fetchOpts = fetchOpts;
        this.apiExtra = apiExtra;
        this.apiKey = apiKey;
        this.updateData({ apiUrl, headers, origin });
    }
    updateData({ apiUrl, headers, origin } = {}) {
        this.apiUrl = this.isValidUrl(apiUrl) ? apiUrl : this.apiUrlPlaceholder;
        const originPlaceholder = this.originPlaceholder !== config.originPlaceholder
            ? this.originPlaceholder
            : this.apiUrl.split("/", 3).join("/");
        this.origin = this.isValidUrl(origin) ? origin : originPlaceholder;
        this.headers = {
            ...this.headers,
            ...headers,
        };
    }
    isValidUrl(url) {
        return /^(http(s)?):\/\//.test(String(url));
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
    async request(path, body, headers = {}, method = "POST") {
        const options = this.getOpts(body, headers, method);
        try {
            const res = await this.fetch(`${this.apiUrl}${path}`, options);
            const data = (await res.json());
            return {
                success: res.status === 200,
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
        throw new NotSupportMethodError();
    }
    async detect(text) {
        throw new NotSupportMethodError();
    }
    async getLangs() {
        throw new NotSupportMethodError();
    }
}
