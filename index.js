module.exports.isValidQuizDescriptor = require('./quizDescriptor').isValidQuizDescriptor;

module.exports.isStringValidSeed = function (seed) {
	return (typeof seed === 'string' && seed.match(/^[a-fA-F0-9]{8}$/) !== null && seed.length == 8);
}

module.exports.QuizValidator = require('./validators/QuizValidator.js');

module.exports.QuizBuilder = require('./QuizBuilder');
