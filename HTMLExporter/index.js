var QuizBuilder = require('../QuizBuilder');
var handlebars = require('handlebars');
var fs = require('fs');
var quizTemplate = "<!DOCTYPE html>\n" 
	+ "<html>\n"
	+ "    <head>\n"
	+ "    </head>\n"
	+ "    <body>\n"
	+ "        <h1>Computer Science Quiz</h1>\n"
	+ "        {{#questions}}\n"
	+ "        <div class=\"question\">\n"
	+ "            {{#if mc}}\n"
	+ "            <p>{{this.question}}</p>\n"
	+ "                {{#choices}}\n"
	+ "                    <p>{{#letterChoice @index}}{{/letterChoice}}. {{this}}</p>\n"
	+ "                {{/choices}}\n"
	+ "            {{else}}\n"
	+ "                <p>{{this.question}}</p>\n"
	+ "                <p><br><br><br></p>\n"
	+ "            {{/if}}\n"
	+ "        </div>\n"
	+ "        {{/questions}}\n"
	+ "    </body>\n"
	+ "</html>";

function generateHTML(qd, seed) {

	var paQuiz = QuizBuilder.build(qd, seed);

    paQuiz.questions.forEach(function(q) {
    q.mc = q.format == "multiple-choice";
}, this);

    var letters = ["A", "B", "C", "D", "E"];
    handlebars.registerHelper('letterChoice', function(index){
        return letters[index];
    })
    
    var data = {"questions":paQuiz.questions};
    var text = quizTemplate;
    
    var template = handlebars.compile(text);
    var html = template(data);
    
    return html;
}

module.exports.generateHTML = generateHTML;
