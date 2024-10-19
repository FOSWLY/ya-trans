import { BaseProviderOpts } from "@/types/providers/base";
import { TranslationService } from "@/types/client";

import YandexBrowserProvider from "./yandexbrowser";
import YandexCloudProvider from "./yandexcloud";
import YandexTranslateProvider from "./yandextranslate";
import MSEdgeTranslateProvider from "./msedge";

export * as YandexBrowserProvider from "./yandexbrowser";
export * as YandexCloudProvider from "./yandexcloud";
export * as YandexTranslateProvider from "./yandextranslate";
export * as MSEdgeTranslateProvider from "./msedge";

export const availableProviders = {
  [TranslationService.yandexbrowser]: YandexBrowserProvider,
  [TranslationService.yandexcloud]: YandexCloudProvider,
  [TranslationService.yandextranslate]: YandexTranslateProvider,
  [TranslationService.msedge]: MSEdgeTranslateProvider,
};

export type AvailableTranslationProviders = typeof availableProviders;

/**
 * A convenient wrapper over the rest of the providers
 */
export default class TranslationProvider {
  providersData: BaseProviderOpts;

  constructor(providersData: BaseProviderOpts = {}) {
    this.providersData = providersData;
  }

  getProvider<K extends keyof AvailableTranslationProviders>(
    service: K,
  ): AvailableTranslationProviders[K]["prototype"] {
    return new availableProviders[service](this.providersData);
  }
}
