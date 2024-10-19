export class ProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProviderError";
    this.message = message;
  }
}

export class NotSupportMethodError extends ProviderError {
  constructor() {
    super("This provider doesn't support selected method");
  }
}

export class TranslateError extends ProviderError {
  constructor(message: string | null) {
    super(`The text couldn't be translated, because ${message}`);
  }
}

export class DetectError extends ProviderError {
  constructor(message: string | null) {
    super(`The language couldn't be detected, because ${message}`);
  }
}

export class DetectEmptyLangError extends ProviderError {
  constructor(text: string | null) {
    super(
      `The server couldn't detect the language and returned an empty string. Check the entered text: "${text}"`,
    );
  }
}

export class GetLangsError extends ProviderError {
  constructor(message: string | null) {
    super(`The list of languages couldn't be retrieved, because ${message}`);
  }
}
