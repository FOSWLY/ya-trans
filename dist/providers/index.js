import { TranslationService } from "../types/client.js";
import YandexBrowserProvider from "./yandexbrowser.js";
import YandexCloudProvider from "./yandexcloud.js";
import YandexTranslateProvider from "./yandextranslate.js";
import MSEdgeTranslateProvider from "./msedge.js";
export { default as BaseProvider } from "./base.js";
export { default as YandexBrowserProvider } from "./yandexbrowser.js";
export { default as YandexCloudProvider } from "./yandexcloud.js";
export { default as YandexTranslateProvider } from "./yandextranslate.js";
export { default as MSEdgeTranslateProvider } from "./msedge.js";
export const availableProviders = {
    [TranslationService.yandexbrowser]: YandexBrowserProvider,
    [TranslationService.yandexcloud]: YandexCloudProvider,
    [TranslationService.yandextranslate]: YandexTranslateProvider,
    [TranslationService.msedge]: MSEdgeTranslateProvider,
};
export default class TranslationProvider {
    providersData;
    constructor(providersData = {}) {
        this.providersData = providersData;
    }
    getProvider(service) {
        return new availableProviders[service](this.providersData);
    }
}
