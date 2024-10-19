import { BaseProvider } from "./base.js";
import { Lang } from "@/types/client";
import { DetectResponse, GetLangsResponse, ProviderResponse, ProviderSuccessResponse, RequestMethod, TranslationResponse } from "@/types/providers/base";
import { FailedResponse, MinimalResponse } from "@/types/providers/yandextranslate";
export default class YandexBrowserProvider extends BaseProvider {
    apiOrigin: string;
    origin: string;
    headers: {
        "Content-Type": string;
        "User-Agent": string;
    };
    srv: string;
    getOpts(body: unknown, headers?: Record<string, string>, method?: RequestMethod): {
        method: RequestMethod;
        headers: {
            Referer: string;
            Origin: string;
            "Content-Type": string;
            "User-Agent": string;
        };
        body: {};
    };
    getParams(params?: Record<string, string>): string;
    getArrayParams(params: readonly [string, string][]): string;
    isErrorRes<T extends MinimalResponse = MinimalResponse>(res: Response, data: T | FailedResponse): data is FailedResponse;
    isSuccessProviderRes<T>(res: ProviderResponse<T>): res is ProviderSuccessResponse<T>;
    isMinimalResponse(data: object): data is MinimalResponse;
    request<T extends object = MinimalResponse>(path: string, body?: unknown, headers?: Record<string, string>, method?: RequestMethod): Promise<ProviderResponse<T>>;
    translate(text: string | string[], lang?: Lang): Promise<TranslationResponse>;
    detect(text: string): Promise<DetectResponse>;
    getLangs(): Promise<GetLangsResponse>;
}
//# sourceMappingURL=yandexbrowser.d.ts.map