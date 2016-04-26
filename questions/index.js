
var questionTypes = {
    "fr-change-of-base": require("paq-fr-change-of-base"),
    "mc-change-of-base": require("paq-mc-change-of-base")
};

module.exports.questionTypes = questionTypes;

function isValidQuestionType(questionType) {
    return (questionType in module.exports.questionTypes);
}

module.exports.isValidQuestionType = isValidQuestionType;

