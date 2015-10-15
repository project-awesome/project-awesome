var MoodleExporter = require('./MoodleExporter');
var questions = require('./questions');
var QuizBuilder = require('./QuizBuilder');

module.exports.checkSeed = QuizBuilder.checkSeed;

module.exports.isValidQuestionType = questions.isValidQuestionType;

module.exports.generateMoodleXML = MoodleExporter.generateMoodleXML;


module.exports.validateQuizDescriptor = QuizBuilder.validateQuizDescriptor;
module.exports.buildQuiz = QuizBuilder.build;
