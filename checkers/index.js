var QuizBuilder = require('../QuizBuilder');
var questions = require('../problemTypes');

var checkers = {
		"seed": QuizBuilder.checkSeed,
		"problemType": questions.isValidProblemType
	};

module.exports.checkers = checkers;

function typeCanBeChecked(type){
	return (type in checkers);
}
