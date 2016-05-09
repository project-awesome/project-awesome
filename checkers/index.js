var QuizBuilder = require('../QuizBuilder');
var questions = require('../questions');

var checkers = {
		"seed": QuizBuilder.checkSeed,
		"questionType": questions.isValidQuestionType
	};

module.exports.checkers = checkers;

function typeCanBeChecked(type){
	return (type in checkers);
}
