import { FetchFunction, Lang } from "../types/client.js";
import { BaseProviderOpts, DetectResponse, GetLangsResponse, ProviderResponse, RequestMethod, TranslationResponse } from "../types/providers/base.js";
export default class BaseProvider {
    apiUrl: string;
    apiExtra?: unknown;
    apiKey?: string;
    origin: string;
    apiUrlPlaceholder: string;
    originPlaceholder: string;
    fetch: FetchFunction;
    headers: Record<string, unknown>;
    fetchOpts: Record<string, unknown>;
    baseLang: string;
    constructor({ fetchFn, fetchOpts, apiUrl, apiExtra, apiKey, origin, headers, }?: BaseProviderOpts);
    updateData({ apiUrl, headers, origin }?: Partial<BaseProviderOpts>): void;
    isValidUrl(url: string | undefined): url is string;
    getOpts(body: unknown, headers?: Record<string, string>, method?: RequestMethod): {
        method: RequestMethod;
        headers: {
            Referer: string;
            Origin: string;
        };
        body: unknown;
    };
    request<T = unknown>(path: string, body: unknown, headers?: Record<string, string>, method?: RequestMethod): Promise<ProviderResponse>;
    translate(text: string | string[], lang?: Lang): Promise<TranslationResponse>;
    detect(text: string): Promise<DetectResponse>;
    getLangs(): Promise<GetLangsResponse>;
}
//# sourceMappingURL=base.d.ts.map