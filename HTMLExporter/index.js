var QuizBuilder = require('../QuizBuilder');
var handlebars = require('handlebars');
var fs = require('fs');
var quizTemplate = "<!DOCTYPE html>\n" 
	+ "<html>\n"
	+ "    <head>\n"
	+ "    </head>\n"
	+ "    <body>\n"
	+ "        <h1>Computer Science Quiz</h1>\n"
	+ "        {{#quizElements}}\n"
	+ "        <div class=\"question\">\n"
	+ "            {{#if mc}}\n"
	+ "            <p>{{this.questionText}}</p>\n"
	+ "                {{#distractors}}\n"
	+ "                    <p>{{#letterChoice @index}}{{/letterChoice}}. {{this}}</p>\n"
	+ "                {{/distractors}}\n"
	+ "            {{else}}\n"
	+ "                <p>{{this.questionText}}</p>\n"
	+ "                <p><br><br><br></p>\n"
	+ "            {{/if}}\n"
	+ "        </div>\n"
	+ "        {{/quizElements}}\n"
	+ "    </body>\n"
	+ "</html>";

function generateHTML(qd, seed) {

	var paQuiz = QuizBuilder.build(qd, seed);

    paQuiz.quizElements.forEach(function(q) {
    q.mc = q.outputType == "mc";
}, this);

    var letters = ["A", "B", "C", "D", "E"];
    handlebars.registerHelper('letterChoice', function(index){
        return letters[index];
    })
    
    var data = {"quizElements":paQuiz.quizElements};
    var text = quizTemplate;
    
    var template = handlebars.compile(text);
    var html = template(data);
    
    return html;
}

module.exports.generateHTML = generateHTML;
