import { Lang } from "../client";

export interface FailedResponse {
  message: string;
}

export type TranslationItem = {
  text: string;
};

export interface TranslateSuccessResponse {
  translations: TranslationItem[];
}

export interface DetectSuccessResponse {
  languageCode: Lang | null;
}

export type LangItem = {
  code: Lang;
  name: string; // localized name by baseLang
};

export interface GetLangsSuccessResponse {
  languages: LangItem[];
}
