var QuizBuilder = require('../QuizBuilder');
var handlebars = require('handlebars');
var fs = require('fs');


function generateHTML(qd, seed, quizTemplate) {
    var result = QuizBuilder.validateQuizDescriptor(qd);
	if (result.length > 0)
		throw new Error("Invalid Quiz Descriptor");
	if (!QuizBuilder.checkSeed(seed)) 
		throw new Error("Invalid Seed: " + seed);


	var paQuiz = QuizBuilder.build(qd, seed);

    paQuiz.questions.forEach(function(q) {
    q.mc = q.format == "multiple-choice";
}, this);

    var letters = ["A", "B", "C", "D", "E"];
    handlebars.registerHelper('letterChoice', function(index){
        return letters[index];
    })
    
    var data = {"questions":paQuiz.questions};
    var text = fs.readFileSync(quizTemplate, 'utf8');
    
    var template = handlebars.compile(text);
    var html = template(data);
    
    fs.writeFileSync('quizResult.html', html);
    return html;
}

/*
generateHTML({
    "version" : "0.1",
    "questions": [{
	    "question": "mc-change-of-base",
	    "repeat": 5
	}]
}, "abcd1234", 'badTemplate.html'
);
*/

module.exports.generateHTML = generateHTML;
