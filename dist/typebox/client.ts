import { Type, Static } from '@sinclair/typebox'


export type FetchFunction = Static<typeof FetchFunction>
export const FetchFunction = Type.Function([Type.Union([
Type.String(),
Type.Never(),
Type.Never()
]), Type.Optional(Type.Any())], Type.Promise(Type.Never()))

export type Lang = Static<typeof Lang>
export const Lang = Type.String()

export type LangPair = Static<typeof LangPair>
export const LangPair = Type.TemplateLiteral([Type.String(), Type.Literal('-'), Type.String()])

export enum EnumTranslationService { yandexbrowser = "yandexbrowser", yandexcloud = "yandexcloud", yandextranslate = "yandextranslate", msedge = "msedge" }

export type TranslationService = Static<typeof TranslationService>
export const TranslationService = Type.Enum(EnumTranslationService)

export type TranslationOpts = Static<typeof TranslationOpts>
export const TranslationOpts = Type.Object({
service: Type.Optional(TranslationService),
fetchFn: Type.Optional(FetchFunction),
fetchOpts: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
apiUrl: Type.Optional(Type.String()),
apiKey: Type.Optional(Type.String()),
apiExtra: Type.Optional(Type.Unknown()),
origin: Type.Optional(Type.String()),
headers: Type.Optional(Type.Record(Type.String(), Type.Unknown()))
})