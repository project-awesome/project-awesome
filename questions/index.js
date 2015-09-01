// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

var binHexOctDec = require("./binHexOctDec");
var changeOfBase = require("./changeOfBase");

module.exports.questionTypes = {
    "binHexOctDec": {"f": binHexOctDec.binHexOctDecQuestion, title: "Bin Hex Oct Dec", validateParameters: binHexOctDec.validateParameters },
    "changeOfBase": {"f": changeOfBase.changeOfBaseQuestion, title: "Change of Base", validateParameters: changeOfBase.validateParameters },
};

// To QA a new question type:
//   * Write instructor documentation for question type
//   * Move the js file from questionsDev to questions
//   * Add unit tests for all the code in file
//   * Refactor code to be understandable
//   * Add integration and regression tests for all code in the file
//   * Get code review of question type
//   * Do pull request for question type

/*
    "cppAppropriateVariables":  {"f": cppAppropriateVariablesQuestion, title: "C++ Variable Types"},
    "cppArgcArgv":              {"f": CppArgcArgvQuestion,         title: "C++ Command Line Arguments"},
    "cppBooleanEval":           {"f": CppBooleanEvalQuestion,      title: "C++ Boolean Evaluation"},
    "cppFunctionOverloading":   {"f": CppFunctionOverloadingQuestion, title: "C++ Function Overloading"},
    "cppFunctionParameters":    {"f": cppFunctionParametersQuestion, title: "C++ Function Parameters"},
    "cppPointerAssignment":     {"f": cppPointerAssignmentQuestion, title: "C++ Pointer Assignment"}
*/

// "changeOfBase":          {"f": changeOfBaseQuestion,       title: "Change of Base"},
// "orderOfOperations":     {"f": orderOfOperationsQuestion,   title: "Order of Operations"},
// "operandsAndOperators":  {"f": operandsAndOperatorsQuestion,title: "Operands and Operators"},
// "pythonProgramOutput":   {"f": pythonProgramOutputQuestion, title: "Python Program Output"},
// "pythonStringSlice":     {"f": pythonStringSliceQuestion,   title: "Python String Slice"},
// "symbolicLogic":         {"f": symbolicLogicQuestion,       title: "Symbolic Logic"},
// "CvariableType":         {"f": CvariableTypeQuestion,       title: "C Variable Type"},
// "cStrings":              {"f": cStringsQuestion,            title: "C Strings"},
// "pyStrings":             {"f": pyStringsQuestion,           title: "Python Strings"},

function isValidQuestionType(questionType) {
    return (module.exports.questionTypes[questionType] !== undefined);
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






