import config from "@/config/config";
import { NotSupportMethodError } from "@/errors";
import { fetchWithTimeout } from "@/utils/utils";
export class BaseProvider {
    apiUrl;
    origin;
    fetch;
    headers = {};
    fetchOpts;
    constructor({ fetchFn = fetchWithTimeout, fetchOpts = {}, apiUrl = config.originPlaceholder, headers = {}, } = {}) {
        this.fetch = fetchFn;
        this.fetchOpts = fetchOpts;
        this.apiUrl = /^(http(s)?):\/\//.test(String(apiUrl))
            ? apiUrl
            : config.originPlaceholder;
        this.origin = this.apiUrl.split("/", 3).join("/");
        this.headers = {
            ...this.headers,
            headers,
        };
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
