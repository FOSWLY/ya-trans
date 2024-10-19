import { Lang, LangPair } from "../client.js";
export type Session = {
    creationTimestamp: number;
    maxAge: number;
    token: string;
};
export type ErrorItem = {
    code: number;
    message: string;
};
export type FailedResponse = Record<"error", ErrorItem>;
export type TranslationItem = {
    text: string;
    to: Lang;
};
export type DetectedLanguage = {
    language: Lang;
    score: number;
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
export declare enum ProfanityAction {
    NoAction = "NoAction",
    Marked = "Marked",
    Deleted = "Deleted"
}
//# sourceMappingURL=msedge.d.ts.map