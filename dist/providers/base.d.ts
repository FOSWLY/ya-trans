import { FetchFunction, Lang } from "@/types/client";
import { BaseProviderOpts, DetectResponse, GetLangsResponse, ProviderResponse, RequestMethod, TranslationResponse } from "@/types/providers/base";
export declare class BaseProvider {
    apiUrl: string;
    origin: string;
    fetch: FetchFunction;
    headers: Record<string, unknown>;
    fetchOpts: Record<string, unknown>;
    constructor({ fetchFn, fetchOpts, apiUrl, headers, }?: BaseProviderOpts);
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