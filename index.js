var MoodleExporter = require('./MoodleExporter');
var questions = require('./questions');
var QuizBuilder = require('./QuizBuilder');


module.exports.list = function (type) {
	var listers = {
		"questionType" : function () {
			return Object.keys(questions.questionTypes);
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
	var generators = {
		"json": QuizBuilder.build,
		"moodleXML": MoodleExporter.generateMoodleXML
	};
	if (!(type in generators))
		throw "Illegal Argument: " + type;
	return generators[type](qd, seed);
}

module.exports.validate = function(type, value) {
	var validators = {
		"qd": QuizBuilder.validateQuizDescriptor
	};
	if (!(type in validators))
		throw "Illegal Argument: " + type;
	return validators[type](value);
}








