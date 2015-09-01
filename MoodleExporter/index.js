var QuizBuilder = require('../QuizBuilder');
var xml = require('xml');

function paQuestionToMoodleJSON(question, questionName) {
	if (questionName === undefined)
		throw new Error("Question Format Conversion Error: questionName bust be defined.");
	if (question.format == 'multiple-choice') {
		
		var moodleMultichoiceQuestion = [
			{ _attr: { type: 'multichoice'} }, 
			{ name: [ { text: questionName } ] },
			{ questiontext: [ { text: question.question } ] },
			{ answernumbering: 'abc' },
			{ correctfeedback: [ { text: 'Your answer is correct.' } ] },
			{ partiallycorrectfeedback: [ { text: 'Your answer is partially correct.' } ] },
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

	} else if (question.format == 'input') {
		var moodleNumericalQuestion = [
			{ _attr: { type: 'shortanswer'} }, 
			{ name: [ { text: questionName } ] },
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

function generateMoodleXML(questionType, count, questionName, seed) {
	if (questionType != 'changeOfBase' && questionType != 'binHexOctDec') 
		throw new Error("Question Type Conversion Error: " + questionType + " to Moodle conversion is not yet implemented.");
	var qd = {
	    "version" : "0.1",
	    "questions": [{
		    "question": questionType,
		    "repeat": count,
		}]
	};
	var paQuiz = QuizBuilder.build(qd, 0, seed);
	var moodleQuizJSON = {};

	moodleQuizJSON.quiz = paQuiz.questions.map(function(q) {
		return { question: paQuestionToMoodleJSON(q, questionName) };
	});

	return xml([moodleQuizJSON]);

}


module.exports.generateMoodleXML = generateMoodleXML;











