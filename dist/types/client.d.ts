export type FetchFunction = (input: string | URL | Request, init?: any) => Promise<Response>;
export type Lang = string;
export type LangPair = `${string}-${string}`;
export declare enum TranslationService {
    yandexbrowser = "yandexbrowser",
    yandexcloud = "yandexcloud",
    yandextranslate = "yandextranslate",
    msedge = "msedge"
}
export type TranslationOpts = {
    service?: TranslationService;
    fetchFn?: FetchFunction;
    fetchOpts?: Record<string, unknown>;
    apiUrl?: string;
    apiKey?: string;
    apiExtra?: unknown;
    headers?: Record<string, unknown>;
};
//# sourceMappingURL=client.d.ts.map