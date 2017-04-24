var QuizBuilder = require('../QuizBuilder');
var xml = require('xml');

var cloze = require('./cloze');

function paQuestionToMoodleJSON(question) {
    // If neither the quizDescriptor nor problem generator supplied a title
    if ( !("title" in question)) {
         question.title = question.problemType;
    }

	if ("label" in question) {

// comsider having short answer question here worth 0 points that contains
// the text 

    } else if (question.outputType == 'mc') {
		
		var moodleMultichoiceQuestion = [
			{ _attr: { type: 'multichoice' } },
			{ name: [ { text: question.title } ] },
			{ questiontext: [ { text: question.questionText } ] },
			{ answernumbering: 'abc' },
			{ correctfeedback: [ { text: 'Your answer is correct.' } ] },
			{ incorrectfeedback: [ { text: 'Your answer is incorrect.' } ] }
		];
		for (var i = 0; question.distractors.length > i; i++) {
			var moodleChoice = { 
				answer: [
					{ _attr: { fraction: (i == question.answerIndex ? '100' : '0') } },
					{ text: question.distractors[i] }
				]
			};
			moodleMultichoiceQuestion.push(moodleChoice);
		}
		return moodleMultichoiceQuestion;

	} else if (question.outputType == 'fr') {
		var moodleNumericalQuestion = [
			{ _attr: { type: 'shortanswer'} }, 
			{ name: [ { text: question.title } ] },
			{ questiontext: [ { text: question.questionText } ] },
			{ answer: [
					{ _attr: { fraction: '100' } },
					{ text: question.answer }
				]
			}
		];
		return moodleNumericalQuestion;
	} else {
		throw new Error("Question Format Conversion Error: " + question.outputType + " is not yet supported by the project awesome Moodle QuizConverter");
	}
}

function generateMoodleXML(qd, seed) {
	var result = QuizBuilder.validateQuizDescriptor(qd);
	if (result.length > 0)
		throw new Error(JSON.stringify(result));
	if (!QuizBuilder.checkSeed(seed)) 
		throw new Error("Invalid Seed: " + seed);


	var paQuiz = QuizBuilder.build(qd, seed);
	var moodleQuizJSON = {};

// MICHELLE STOPPED HERE THINKING ABOUT HOW TO HANDLE LABELS
	moodleQuizJSON.quiz = paQuiz.quizElements.map(function(q) {
		return { question: paQuestionToMoodleJSON(q) };
	});

	return xml([moodleQuizJSON]);

}

module.exports.generateMoodleXML = generateMoodleXML;











