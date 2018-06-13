var QuizBuilder = require('../QuizBuilder');
var handlebars = require('handlebars');
var fs = require('fs');
var quizTemplate = ""
	+ "{{#questions}}\n"
	+ "<li>\n"
	+ "  {{#if mc}}\n"
	+ "    <p>{{this.question}}</p>\n"
	+ "    {{#choices}}\n"
	+ "      <p>{{#letterChoice @index}}{{/letterChoice}}. {{this}}</p>\n"
	+ "    {{/choices}}\n"
	+ "  {{else}}\n"
	+ "    <p>{{this.question}}</p>\n"
	+ "  {{/if}}\n"
	+ "</li>\n"
        + " {{/questions}}\n";

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
