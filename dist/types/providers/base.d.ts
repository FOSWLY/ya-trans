import { FetchFunction, Lang, LangPair } from "../client.js";
export type BaseProviderOpts = {
    fetchFn?: FetchFunction;
    fetchOpts?: Record<string, unknown>;
    apiUrl?: string;
    apiKey?: string;
    apiExtra?: unknown;
    origin?: string;
    headers?: Record<string, unknown>;
};
export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type ProviderSuccessResponse<T = unknown> = {
    success: boolean;
    data: T;
};
export type ProviderFailedResponse = {
    success: false;
    data: string | null;
};
export type ProviderResponse<T = unknown> = ProviderFailedResponse | ProviderSuccessResponse<T>;
export type TranslationResponse = {
    lang: LangPair;
    translations: string[];
};
export type DetectResponse = {
    lang: Lang;
    score: number | null;
};
export type GetLangsResponse = Lang[] | LangPair[];
//# sourceMappingURL=base.d.ts.map