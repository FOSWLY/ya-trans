export declare class ProviderError extends Error {
    constructor(message: string);
}
export declare class NotSupportMethodError extends ProviderError {
    constructor();
}
export declare class TranslateError extends ProviderError {
    constructor(message: string | null);
}
export declare class DetectError extends ProviderError {
    constructor(message: string | null);
}
export declare class DetectEmptyLangError extends ProviderError {
    constructor(text: string | null);
}
export declare class GetLangsError extends ProviderError {
    constructor(message: string | null);
}
//# sourceMappingURL=errors.d.ts.map