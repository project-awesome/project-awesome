
var questionTypes = {
    "fr-change-of-base": require("paq-fr-change-of-base"),
    "mc-change-of-base": require("paq-mc-change-of-base")
};

module.exports.questionTypes = questionTypes;

function isValidQuestionType(questionType) {
    return (questionType in module.exports.questionTypes);
}

function validateQuestionDescriptor(questionDescriptor) {
    var errors = [];
    if (questionDescriptor === undefined)
        return [{type:'RequiredError', path:[]}];
    if (typeof questionDescriptor !== 'object')
        return [{type:'ExpectedObjectError', path:[]}];
    if (!('question' in questionDescriptor)) {
        errors.unshift({ type: 'RequiredError', path:['question'] });
    } else if(typeof(questionDescriptor.question) !== "string") {
        errors.unshift({ type: 'ExpectedStringError', path:['question'] });
    } else if (!isValidQuestionType(questionDescriptor.question)) {
        errors.unshift({ type: 'InvalidQuestionType', path:['question'] });
    } else {
        var parameterErrors = module.exports.questionTypes[questionDescriptor.question].validateParameters(questionDescriptor.parameters);
        parameterErrors = parameterErrors.map(function(pError) { 
            pError.path = ['parameters'].concat(pError.path);
            return pError;
        });
        errors = errors.concat(parameterErrors);
    }

    if (!('repeat' in questionDescriptor)) {
        errors.unshift({ type: 'RequiredError', path:['repeat'] });
    } else if (!(Number.isSafeInteger(questionDescriptor.repeat))) {
        errors.unshift({ type: 'ExpectedIntegerError', path:['repeat'] });
    } else if (questionDescriptor.repeat < 1) {
        errors.unshift({ type: 'MinimumValueError', path:['repeat'] });
    }
    return errors;
}

module.exports.validateQuestionDescriptor = validateQuestionDescriptor;
module.exports.isValidQuestionType = isValidQuestionType;

