var MoodleExporter = require('./MoodleExporter');
var questions = require('./questions');
var QuizBuilder = require('./QuizBuilder');

function check(type, value) {
	var checkers = {
		"seed": QuizBuilder.checkSeed,
		"questionType": questions.isValidQuestionType
	};
	if (!(type in checkers))
		throw "Illegal Argument: " + type;
	return checkers[type](value);
}

function generate(type, qd, seed) {
	var generators = {
		"json": QuizBuilder.build,
		"moodleXML": MoodleExporter.generateMoodleXML
	};
	if (!(type in generators))
		throw "Illegal Argument: " + type;
	return generators[type](qd, seed);
}

function validate(type, value) {
	var validators = {
		"qd": QuizBuilder.validateQuizDescriptor
	};
	if (!(type in validators))
		throw "Illegal Argument: " + type;
	return validators[type](value);
}

module.exports.check = check;
module.exports.generate = generate;
module.exports.validate = validate;







