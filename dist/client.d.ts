import { FetchFunction, Lang, TranslationOpts, TranslationService } from "./types/client.js";
import BaseProvider from "./providers/base.js";
export default class TranslationClient {
    service: TranslationService;
    fetch: FetchFunction;
    fetchOpts: Record<string, unknown>;
    apiUrl: string | undefined;
    apiKey: string | undefined;
    apiExtra: unknown;
    origin: string | undefined;
    headers: Record<string, unknown>;
    provider: BaseProvider;
    constructor({ service, fetchFn, fetchOpts, apiUrl, apiKey, apiExtra, origin, headers, }?: TranslationOpts);
    changeService({ service, fetchFn, fetchOpts, apiUrl, apiKey, apiExtra, origin, headers, }?: TranslationOpts): void;
    translate(text: string | string[], lang?: Lang): Promise<import("./types/providers/base.js").TranslationResponse>;
    detect(text: string): Promise<import("./types/providers/base.js").DetectResponse>;
    getLangs(): Promise<import("./types/providers/base.js").GetLangsResponse>;
}
//# sourceMappingURL=client.d.ts.map