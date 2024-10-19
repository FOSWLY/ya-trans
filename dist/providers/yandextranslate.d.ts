import { BaseProvider } from "./base.js";
import { Lang } from "@/types/client";
import { DetectResponse, GetLangsResponse, ProviderResponse, ProviderSuccessResponse, RequestMethod, TranslationResponse } from "@/types/providers/base";
import { DetectOptions, FailedResponse, Session, Srv, TranslateOptions } from "@/types/providers/yandextranslate";
export default class YandexTranslateProvider extends BaseProvider {
    MAX_UID: number;
    NANO_DIFF: number;
    apiOrigin: string;
    sessionOrigin: string;
    origin: string;
    headers: {
        "Content-Type": string;
        "User-Agent": string;
    };
    baseLang: string;
    session: Session | null;
    genYandexUID(): string;
    genYandexMetrikaUID(): string;
    getSecure(srv: Srv): {
        srv: Srv;
        yu: string;
        yum: string;
    };
    getSession(): Promise<Session>;
    getOpts(body: URLSearchParams | null, headers?: Record<string, string>, method?: RequestMethod): {
        method: RequestMethod;
        headers: {
            Referer: string;
            Origin: string;
            "Content-Type": string;
            "User-Agent": string;
        };
        body: URLSearchParams | null;
    };
    getParams(srv: Srv, params?: Record<string, string>): string;
    isErrorRes<T extends object>(res: Response, data: T | FailedResponse): data is FailedResponse;
    isSuccessProviderRes<T>(res: ProviderResponse<T>): res is ProviderSuccessResponse<T>;
    request<T extends object>(path: string, body?: URLSearchParams | null, headers?: Record<string, string>, method?: RequestMethod): Promise<ProviderResponse<T>>;
    createSession(): Promise<Session>;
    rawTranslate(text: string | string[], lang?: Lang, options?: TranslateOptions): Promise<{
        lang: `${string}-${string}`;
        translations: string[];
        align: string[] | undefined;
        detected: Record<"lang", string> | undefined;
    }>;
    translate(text: string | string[], lang?: Lang): Promise<TranslationResponse>;
    rawDetect(text: string, options?: DetectOptions): Promise<{
        lang: string;
        probs: Record<string, number>;
        score: number;
    }>;
    detect(text: string): Promise<DetectResponse>;
    getLangs(): Promise<GetLangsResponse>;
}
//# sourceMappingURL=yandextranslate.d.ts.map