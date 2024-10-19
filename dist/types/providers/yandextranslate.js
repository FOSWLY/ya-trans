export var TranslateOptions;
(function (TranslateOptions) {
    TranslateOptions[TranslateOptions["default"] = 0] = "default";
    TranslateOptions[TranslateOptions["detectedLang"] = 1] = "detectedLang";
    TranslateOptions[TranslateOptions["align"] = 2] = "align";
    TranslateOptions[TranslateOptions["alignAndDetectedLang"] = 3] = "alignAndDetectedLang";
    TranslateOptions[TranslateOptions["detailAlign"] = 4] = "detailAlign";
    TranslateOptions[TranslateOptions["detailAlignAndDetectedLang"] = 5] = "detailAlignAndDetectedLang";
})(TranslateOptions || (TranslateOptions = {}));
export var DetectOptions;
(function (DetectOptions) {
    DetectOptions["default"] = "0";
    DetectOptions["probs"] = "2";
    DetectOptions["allProbs"] = "6";
    DetectOptions["withCurrentProb"] = "16";
    DetectOptions["probsWithCurrentProb"] = "18";
    DetectOptions["allProbsWithCurrentProb"] = "22";
})(DetectOptions || (DetectOptions = {}));
