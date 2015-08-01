var tempQuizBuilder = require('../quiz');

function buildQuizFromQuizDescriptor(descriptor, id, seed) {
	var tmpQuiz = new tempQuizBuilder.Quiz(descriptor, { seed : seed });

    var showQuestions = 1;
    var showKey = 1;
    var showJson = 1;

    var quiz = {};

    quiz.title = descriptor.title;
    quiz.qd = id;
    quiz.seed = seed;
    quiz.questions = [];


	for (var i = 0; i < tmpQuiz.questions.length; i++) {
    	var q = { 
    		question : tmpQuiz.questions[i].question,
    		answer : tmpQuiz.questions[i].answer,
            format : tmpQuiz.questions[i].format
    	};
    	quiz.questions.push(q);

	}

	return quiz;

}


module.exports.build = buildQuizFromQuizDescriptor;

