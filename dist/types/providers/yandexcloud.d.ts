import { Lang } from "../client.js";
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
    name: string;
};
export interface GetLangsSuccessResponse {
    languages: LangItem[];
}
//# sourceMappingURL=yandexcloud.d.ts.map