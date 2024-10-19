import { Lang, LangPair } from "../client.js";
export type Srv = "tr-text" | "tr-image";
export type Session = {
    creationTimestamp: number;
    id: string;
    maxAge: number;
    status: string;
    statusCode: number;
};
export type SessionResponse = Record<"session", Session>;
export type MinimalResponse = {
    code: number;
};
export interface FailedResponse extends MinimalResponse {
    message: string;
}
export interface TranslateSuccessResponse extends MinimalResponse {
    lang: LangPair;
    text: string[];
}
export interface TranslateDetailSuccessResponse extends TranslateSuccessResponse {
    align?: string[];
    detected?: Record<"lang", Lang>;
}
export interface DetectSuccessResponse extends MinimalResponse {
    lang: Lang;
}
export interface DetectDetailSuccessResponse extends DetectSuccessResponse {
    probs: Record<string, number>;
    score: number;
}
export interface GetLangsSuccessResponse {
    dirs: LangPair[];
}
export declare enum TranslateOptions {
    default = 0,
    detectedLang = 1,
    align = 2,
    alignAndDetectedLang = 3,
    detailAlign = 4,
    detailAlignAndDetectedLang = 5
}
export declare enum DetectOptions {
    default = "0",
    probs = "2",
    allProbs = "6",
    withCurrentProb = "16",
    probsWithCurrentProb = "18",
    allProbsWithCurrentProb = "22"
}
//# sourceMappingURL=yandextranslate.d.ts.map