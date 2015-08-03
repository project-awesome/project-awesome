var QuizValidator = require('./validators/QuizValidator.js');

module.exports.isValidQuizDescriptor = require('./quizDescriptor').isValidQuizDescriptor;

module.exports.isStringValidSeed = require('./')

module.exports.QuizValidator = QuizValidator;
module.exports.isStringValidSeed = QuizValidator.isStringValidSeed;

module.exports.QuizBuilder = require('./QuizBuilder');
