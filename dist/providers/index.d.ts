import { BaseProviderOpts } from "@/types/providers/base";
import YandexBrowserProvider from "./yandexbrowser.js";
import YandexCloudProvider from "./yandexcloud.js";
import YandexTranslateProvider from "./yandextranslate.js";
import MSEdgeTranslateProvider from "./msedge.js";
export * as YandexBrowserProvider from "./yandexbrowser.js";
export * as YandexCloudProvider from "./yandexcloud.js";
export * as YandexTranslateProvider from "./yandextranslate.js";
export * as MSEdgeTranslateProvider from "./msedge.js";
export declare const availableProviders: {
    yandexbrowser: typeof YandexBrowserProvider;
    yandexcloud: typeof YandexCloudProvider;
    yandextranslate: typeof YandexTranslateProvider;
    msedge: typeof MSEdgeTranslateProvider;
};
export type AvailableTranslationProviders = typeof availableProviders;
export default class TranslationProvider {
    providersData: BaseProviderOpts;
    constructor(providersData?: BaseProviderOpts);
    getProvider<K extends keyof AvailableTranslationProviders>(service: K): AvailableTranslationProviders[K]["prototype"];
}
//# sourceMappingURL=index.d.ts.map