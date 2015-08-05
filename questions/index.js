// NEW-QUESTION-TYPE: add to questionFunctions dictionary below

var binHexOctDec = require("./binHexOctDec");
var changeOfBase = require("./changeOfBase");
var cppAppropriateVariables = require("./cppAppropriateVariables");

module.exports.questionTypes = {
    "binHexOctDec":             {"f": binHexOctDec.binHexOctDecQuestion,        title: "Bin Hex Oct Dec"},
    "changeOfBase":             {"f": changeOfBase.changeOfBaseQuestion,        title: "Change of Base"},
    "cppAppropriateVariables":  {"f": cppAppropriateVariablesQuestion,          title: "C++ Variable Types"},
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


module.exports.addOptionForEachQuestionType = function(e) {
    $.each(module.exports.questionTypes, function(key, val) {
	    e.append($('<option></option>').val(key).html(val.title));
	});
};
