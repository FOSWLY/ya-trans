import { BaseProvider } from "./base.js";
import { Lang } from "@/types/client";
import { DetectResponse, GetLangsResponse, ProviderResponse, ProviderSuccessResponse, RequestMethod, TranslationResponse } from "@/types/providers/base";
import { FailedResponse } from "@/types/providers/yandexcloud";
export default class YandexCloudProvider extends BaseProvider {
    apiOrigin: string;
    origin: string;
    headers: {
        "Content-Type": string;
        "User-Agent": string;
    };
    baseLang: string;
    getOpts(body: unknown, headers?: Record<string, string>, method?: RequestMethod): {
        method: RequestMethod;
        headers: {
            Referer: string;
            Origin: string;
            "Content-Type": string;
            "User-Agent": string;
        };
        body: unknown;
    };
    isErrorRes<T extends object>(res: Response, data: T | FailedResponse): data is FailedResponse;
    isSuccessProviderRes<T>(res: ProviderResponse<T>): res is ProviderSuccessResponse<T>;
    request<T extends object>(path: string, body?: unknown, headers?: Record<string, string>, method?: RequestMethod): Promise<ProviderResponse<T>>;
    translate(text: string | string[], lang?: Lang): Promise<TranslationResponse>;
    detect(text: string): Promise<DetectResponse>;
    getLangs(): Promise<GetLangsResponse>;
}
//# sourceMappingURL=yandexcloud.d.ts.map