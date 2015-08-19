//quiz.js -- handles the generation of the Quiz from a QuizDescriptor and a Seed,
//and the rendering of it as HTML

module.exports = {}


var randomModule = require("../random");
var quizDescriptorModule = require("../quizDescriptor");

var questionsModule = require("../questions");

module.exports.addOptionForEachQuestionType = questionsModule.addOptionForEachQuestionType;

module.exports.Quiz = function (quizDescriptor,params) {

    if (typeof(params)!=='object') {
        throw new Error("2nd parameter to Quiz constructor should be an object");
    }
    
    if ('seed' in params) {
        this.seed = params.seed;
        this.randomStream = new randomModule.random(params.seed);
    } else if ('randomStream' in params) {
        this.randomStream = params.randomStream;
        this.seed = params.randomStream.currentSeed;
    } else {
	   throw new Error("2nd parameter to quiz constructor must contain either seed or randomStream");
    }

    this.jsonObject = quizDescriptor;
    this.questions = quizDescriptorModule.produceArrayOfQuestions(this.jsonObject, this.randomStream);
    this.quizname = this.jsonObject.quizTitle;

};

module.exports.putQuizInWebPage = function() {

    var url = require('url');
    var parts = url.parse(window.location.href,true);

    var jsonString = parts.query.jsonString;
    var showQuestions = parts.query.showQuestions;
    var showKey = parts.query.showKey;
    var showJson = parts.query.showJson;

    var seed = randomModule.determineSeed(parts.query.seed);

    var quizDescriptor = JSON.parse(jsonString);

    var quiz = new module.exports.Quiz(quizDescriptor,{"seed" : seed});

    $("#quizname").html(quiz.quizname);
    
    if (showQuestions=="yes") { 
	var questionHTML = "<h2>Questions</h2>\n<ol>\n";
	for (var i=0; i<quiz.questions.length; i++) {
	    questionHTML += "<li>"+quiz.questions[i].question.html + "</li>";	    
	}
	questionHTML += "</ol>";
        $("#questions").html(questionHTML); 
    }

    if (showKey=="yes") { 
	var answerHTML = "<h2>Key</h2>\n<ol>\n";
	for (var i=0; i<quiz.questions.length; i++) {
	    answerHTML += "<li>" + quiz.questions[i].answer.html + "</li>";	    
	}
	answerHTML += "</ol>";
        $("#key").html(answerHTML); 
    }

}

/*
function formatPts(pts) {
    if (pts == 0)
	return "";
    if (pts == 1)
	return "(1 pt) ";

    return "(" + pts + " pts) ";
}
*/