import { TranslationService } from "@/types/client";
import TranslationClient from "../dist/client";

const client = new TranslationClient({
  service: TranslationService.yandexbrowser,
});

const phrase = "The quick brown fox jumps over the lazy dog";

const translatedResult = await client.translate(phrase);

console.log(translatedResult);

const detectResult = await client.detect(phrase);

console.log(detectResult);

const langs = await client.getLangs();

console.log(langs);
