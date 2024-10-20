import { BaseProviderOpts } from "../types/providers/base.js";
import YandexBrowserProvider from "./yandexbrowser.js";
import YandexCloudProvider from "./yandexcloud.js";
import YandexTranslateProvider from "./yandextranslate.js";
import MSEdgeTranslateProvider from "./msedge.js";
export { default as BaseProvider } from "./base.js";
export { default as YandexBrowserProvider } from "./yandexbrowser.js";
export { default as YandexCloudProvider } from "./yandexcloud.js";
export { default as YandexTranslateProvider } from "./yandextranslate.js";
export { default as MSEdgeTranslateProvider } from "./msedge.js";
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