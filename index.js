module.exports.isValidQuizDescriptor = require('./quizDescriptor').isValidQuizDescriptor;

module.exports.isStringValidSeed = function(seed) {
	return (seed.matches("[0-9A-F]+") && seed.length == 8);
}

module.exports.QuizValidator = require('./validators/QuizValidator.js');

module.exports.QuizBuilder = require('./QuizBuilder');
