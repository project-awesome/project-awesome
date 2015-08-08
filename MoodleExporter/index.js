var QuizBuilder = require('../QuizBuilder');
var xml = require('xml');

function paQuestionToMoodleJSON(question, questionName) {
	if (questionName === undefined)
		throw new Error("Question Format Conversion Error: questionName bust be defined.");
	if (question.format == 'multiple-choice') {
		
		var moodleQuestion = [
			{ _attr: { type: 'multichoice'} }, 
			{ name: [ { text: questionName } ] },
			{ questiontext: [ { text: question.question } ] }, 
			/*
			{ defaultgrade: 1.0 },
			{ penalty: 0.0 },
			{ hidden: 0 },
			{ single: true },
			*/
			{ shuffleanswers: true },
			{ answernumbering: 'abc' },
			{ correctfeedback: [ { text: 'Your answer is correct.' } ] },
			{ partiallycorrectfeedback: [ { text: 'Your answer is partially correct.' } ] },
			{ incorrectfeedback: [ { text: 'Your answer is incorrect.' } ] }
		];
		for (var i = 0; question.choices.length > i; i++) {
			var moodleChoice = { 
				answer: [
					{ _attr: { fraction: (i == question.answer ? '100' : '0') } },
					{ text: question.choices[i] },
					{ feedback: [ { text: '' } ] }
				]
			};
			moodleQuestion.push(moodleChoice);
		}
		return moodleQuestion;

	} else {
		throw new Error("Question Format Conversion Error: " + question.format + " is not yet supported by the project awesome QuizConverter");
	}
}

function generateMoodleXML(questionType, count, questionName) {
	if (questionType != 'changeOfBase') 
		throw new Error("Question Type Conversion Error: " + questionType + " to Moodle conversion is not yet implemented.");
	var qd = {
	    "version" : "0.1",
	    "title" : "Example QuizJSON 1",
	    "quiz": [{
		    "question": questionType,
		    "repeat": count,
		}]
	};
	var paQuiz = QuizBuilder.build(qd, 0, 0);
	var moodleQuizJSON = {};

	moodleQuizJSON.quiz = paQuiz.questions.map(function(q) {
		return { question: paQuestionToMoodleJSON(q, questionName) };
	});

	return xml([moodleQuizJSON]);

}


module.exports.generateMoodleXML = generateMoodleXML;











