var MoodleExporter = require('./MoodleExporter');
var HTMLExporter = require('./HTMLExporter');
var questions = require('./questions');
var formats = require('./formats');
var checkers = require('./checkers');
var QuizBuilder = require('./QuizBuilder');


module.exports.list = function (type) {
	var listers = {
		"questionType" : function () {
			return Object.keys(questions.questionTypes);
		},
		"quizFormat" : function (){
			return Object.keys(formats.quizFormats);
		},
		"checkableType" : function(){
			return Object.keys(checkers.checkers);
		}
	};
	if (!(type in listers)) 
		throw "Illegal Argument: " + type;
	return listers[type]();
}

module.exports.check = function(type, value) {
	var checkers = {
		"seed": QuizBuilder.checkSeed,
		"questionType": questions.isValidQuestionType
	};
	if (!(type in checkers))
		throw "Illegal Argument: " + type;
	return checkers[type](value);
}

module.exports.generate = function(type, qd, seed) {	
	if (!(type in formats.quizFormats))
		throw "Illegal Argument: " + type;
	return formats.quizFormats[type](qd, seed);
}

module.exports.validate = function(type, value) {
	var validators = {
		"qd": QuizBuilder.validateQuizDescriptor
	};
	if (!(type in validators))
		throw "Illegal Argument: " + type;
	return validators[type](value);
}








