var QuizValidator = require('./validators/QuizValidator.js');
var MoodleExporter = require('./MoodleExporter');
var questions = require('./questions');
var QuizBuilder = require('./QuizBuilder');

module.exports.QuizValidator = QuizValidator;
module.exports.isSeedValid = QuizValidator.isSeedValid;

module.exports.isValidQuestionType = questions.isValidQuestionType;

module.exports.generateMoodleXML = MoodleExporter.generateMoodleXML;


module.exports.validateQuizDescriptor = QuizBuilder.validateQuizDescriptor;
module.exports.buildQuiz = QuizBuilder.build;
