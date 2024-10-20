import { fetchWithTimeout } from "@/utils/utils";
import {
  FetchFunction,
  Lang,
  TranslationOpts,
  TranslationService,
} from "@/types/client";
import TranslationProvider from "@/providers";
import BaseProvider from "@/providers/base";

export default class TranslationClient {
  /**
   * The service through which the translation is carried out
   */
  service!: TranslationService;

  /**
   * If you don't want to use the classic fetch
   * @includeExample examples/with_ofetch.ts:1-15
   */
  fetch!: FetchFunction;

  /**
   * Allows you to set specific values (e.g. proxy). When changing headers/body through this parameter, it is replaced entirely
   */
  fetchOpts!: Record<string, unknown>;

  apiUrl: string | undefined;
  apiKey: string | undefined;
  apiExtra: unknown;
  origin: string | undefined;

  /**
   * Adds headers to the list of headers
   */
  headers: Record<string, unknown> = {};

  provider!: BaseProvider;

  constructor({
    service = TranslationService.yandexbrowser,
    fetchFn = fetchWithTimeout,
    fetchOpts = {},
    apiUrl = undefined,
    apiKey = undefined,
    apiExtra = undefined,
    origin = undefined,
    headers = {},
  }: TranslationOpts = {}) {
    this.changeService({
      service,
      fetchFn,
      fetchOpts,
      apiUrl,
      apiKey,
      apiExtra,
      origin,
      headers,
    });
  }

  /**
   * Change selected service to one of other
   */
  changeService({
    service = this.service,
    fetchFn = this.fetch,
    fetchOpts = this.fetchOpts,
    apiUrl = this.apiUrl,
    apiKey = this.apiKey,
    apiExtra = this.apiExtra,
    origin = this.origin,
    headers = this.headers,
  }: TranslationOpts = {}) {
    this.service = service;
    this.fetch = fetchFn;
    this.fetchOpts = fetchOpts;
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.apiExtra = apiExtra;
    this.headers = headers;
    this.origin = origin;
    this.provider = new TranslationProvider({
      fetchFn: this.fetch,
      fetchOpts: this.fetchOpts,
      apiUrl: this.apiUrl ?? undefined,
      apiKey: this.apiKey ?? undefined,
      apiExtra: this.apiExtra ?? undefined,
      origin: this.origin ?? undefined,
      headers: this.headers,
    }).getProvider(this.service);
  }

  async translate(text: string | string[], lang: Lang = "en-ru") {
    return await this.provider.translate(text, lang);
  }

  async detect(text: string) {
    return await this.provider.detect(text);
  }

  async getLangs() {
    return await this.provider.getLangs();
  }
}
