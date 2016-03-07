var QuizBuilder = require('../QuizBuilder');
var handlebars = require('handlebars');
var fs = require('fs');
var quizTemplate = fs.readFileSync('HTMLExporter/quizTemplate.html', 'utf8');


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
    
    fs.writeFileSync('quizResult.html', html);
    return html;
}

module.exports.generateHTML = generateHTML;
