import TranslationClient from "../dist/client";
import { TranslationService } from "../dist/types/client";

// you should use your own gm_fetch implementation
// e.g. https://github.com/ilyhalight/voice-over-translation/blob/master/src/utils/utils.js
async function GM_fetch(url: string | Request | URL, opt = {}) {
  return await fetch(url, opt);
}

const client = new TranslationClient({
  service: TranslationService.yandexbrowser,
  fetchFn: GM_fetch,
});

const phrase = "The quick brown fox jumps over the lazy dog";

const translatedResult = await client.translate(phrase);

console.log(translatedResult);
