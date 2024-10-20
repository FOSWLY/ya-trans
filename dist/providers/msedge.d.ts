import BaseProvider from "./base.js";
import { Lang } from "../types/client.js";
import { BaseProviderOpts, DetectResponse, GetLangsResponse, ProviderResponse, ProviderSuccessResponse, RequestMethod, TranslationResponse } from "../types/providers/base.js";
import { FailedResponse, ProfanityAction, RawTranslateResponse, Session } from "../types/providers/msedge.js";
export default class MSEdgeTranslateProvider extends BaseProvider {
    apiUrlPlaceholder: string;
    sessionUrl: string;
    originPlaceholder: string;
    headers: {
        "Content-Type": string;
        "User-Agent": string;
    };
    session: Session | null;
    constructor(options?: BaseProviderOpts);
    getSession(): Promise<Session>;
    getOpts(body: string | null, headers?: Record<string, string>, method?: RequestMethod): {
        method: RequestMethod;
        headers: {
            Referer: string;
            Origin: string;
            "Content-Type": string;
            "User-Agent": string;
        };
        body: string | null;
    };
    getParams(params?: Record<string, string>): string;
    isErrorRes<T extends object>(res: Response, data: T | FailedResponse): data is FailedResponse;
    isSuccessProviderRes<T>(res: ProviderResponse<T>): res is ProviderSuccessResponse<T>;
    request<T extends object>(path: string, body?: string | null, headers?: Record<string, string>, method?: RequestMethod): Promise<ProviderResponse<T>>;
    createSession(): Promise<{
        creationTimestamp: number;
        maxAge: number;
        token: string;
    }>;
    rawTranslate(text: string | string[], lang?: Lang, profanityAction?: ProfanityAction): Promise<RawTranslateResponse>;
    translate(text: string | string[], lang?: Lang): Promise<TranslationResponse>;
    rawDetect(text: string | string[]): Promise<{
        score: number;
        isTranslationSupported: boolean;
        isTransliterationSupported: boolean;
        language: Lang;
    }[]>;
    detect(text: string): Promise<DetectResponse>;
    getLangs(): Promise<GetLangsResponse>;
}
//# sourceMappingURL=msedge.d.ts.map