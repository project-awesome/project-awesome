var QuizBuilder = require('../QuizBuilder');
var xml = require('xml');

function paQuestionToMoodleJSON(question) {
	if (question.format == 'multiple-choice') {
		
		var moodleMultichoiceQuestion = [
			{ _attr: { type: 'multichoice' } },
			{ name: [ { text: question.title } ] },
			{ questiontext: [ { text: question.question } ] },
			{ answernumbering: 'abc' },
			{ correctfeedback: [ { text: 'Your answer is correct.' } ] },
			{ incorrectfeedback: [ { text: 'Your answer is incorrect.' } ] }
		];
		for (var i = 0; question.choices.length > i; i++) {
			var moodleChoice = { 
				answer: [
					{ _attr: { fraction: (i == question.answer ? '100' : '0') } },
					{ text: question.choices[i] }
				]
			};
			moodleMultichoiceQuestion.push(moodleChoice);
		}
		return moodleMultichoiceQuestion;

	} else if (question.format == 'free-response') {
		var moodleNumericalQuestion = [
			{ _attr: { type: 'shortanswer'} }, 
			{ name: [ { text: question.title } ] },
			{ questiontext: [ { text: question.question } ] },
			{ answer: [
					{ _attr: { fraction: '100' } },
					{ text: question.answer }
				]
			}
		];
		return moodleNumericalQuestion;
	} else {
		throw new Error("Question Format Conversion Error: " + question.format + " is not yet supported by the project awesome QuizConverter");
	}
}

function generateMoodleXML(qd, seed) {
	var result = QuizBuilder.validateQuizDescriptor(qd);
	if (result.length > 0)
		throw new Error("Invalid Quiz Descriptor");
	if (!QuizBuilder.checkSeed(seed)) 
		throw new Error("Invalid Seed: " + seed);



	var paQuiz = QuizBuilder.build(qd, seed);
	var moodleQuizJSON = {};

	moodleQuizJSON.quiz = paQuiz.questions.map(function(q) {
		return { question: paQuestionToMoodleJSON(q) };
	});

	return xml([moodleQuizJSON]);

}


module.exports.generateMoodleXML = generateMoodleXML;











