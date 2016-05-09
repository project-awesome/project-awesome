var MoodleExporter = require('../MoodleExporter');
var HTMLExporter = require('../HTMLExporter');
var QuizBuilder = require('../QuizBuilder');

var quizFormats = {
    "json": QuizBuilder.build,
	"moodleXML": MoodleExporter.generateMoodleXML,
	"html": HTMLExporter.generateHTML
};

module.exports.quizFormats = quizFormats;

function isValidQuizFormat(quizFormat) {
    return (quizFormat in quizFormats);
}

module.exports.isValidQuizFormat = isValidQuizFormat;