import { Lang, LangPair } from "../client";

export type Session = {
  creationTimestamp: number; // in secs
  maxAge: number;
  token: string;
};

export type ErrorItem = {
  code: number; // http status code + 001 (?)
  message: string;
};

export type FailedResponse = Record<"error", ErrorItem>;

export type TranslationItem = {
  text: string;
  to: Lang;
};

export type DetectedLanguage = {
  language: Lang;
  score: number; // 0.0 - 1.0
};

export interface DetailedDetectedLanguage extends DetectedLanguage {
  isTranslationSupported: boolean;
  isTransliterationSupported: boolean;
}

export type TranslateSuccessResponse = {
  detectedLanguage?: DetectedLanguage;
  translations: TranslationItem[];
}[];

export type RawTranslateResponse = {
  lang: LangPair;
  data: TranslateSuccessResponse;
};

export type DetectSuccessResponse = DetailedDetectedLanguage[];

export type LangInfoItem = {
  name: string;
  nativeName: string;
  dir: string;
};

export interface GetLangsSuccessResponse {
  translation: Record<Lang, LangInfoItem>;
}

export enum ProfanityAction {
  NoAction = "NoAction",
  Marked = "Marked",
  Deleted = "Deleted",
}
