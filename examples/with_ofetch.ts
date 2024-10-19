import { ofetch } from "ofetch";
import TranslationClient from "../dist/client";
import { TranslationService } from "../dist/types/client";

// https://github.com/unjs/ofetch
const client = new TranslationClient({
  service: TranslationService.yandexbrowser,
  fetchFn: ofetch.native,
});

const phrase = "The quick brown fox jumps over the lazy dog";

const translatedResult = await client.translate(phrase);

console.log(translatedResult);
