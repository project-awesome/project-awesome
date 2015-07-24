//quiz.js -- handles the generation of the Quiz from a QuizDescriptor and a Seed,
//and the rendering of it as HTML

module.exports = {}


var randomModule = require("../random");
var quizDescriptorModule = require("../quizDescriptor");

module.exports.Quiz = function (quizDescriptor,params) {

    if (typeof(params)!=='object') {
	throw new Error("2nd parameter to Quiz constructor should be an object");
    }
    
    if ('seed' in params) {
	this.seed = params.seed
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

module.exports.buildQuiz = function() {

    var url = require('url');
    var parts = url.parse(window.location.href,true);

    var jsonString = parts.query.jsonString;
    var showQuestions = parts.query.showQuestions;
    var showKey = parts.query.showKey;
    var showJson = parts.query.showJson;

    var seed = determineSeed(parts.query.seed);

    var quizDescriptor = JSON.parse(jsonString);

    var quiz = new Quiz(seed,quizDescriptor);

    $("#quizname").html(quiz.quizname);

    if (showQuestions=="yes") { 
        $("#questions").html("<h2>Questions</h2>\n" + quiz.formatQuestionsHTML()); 
    } else {
        $("#questions").html(linkQuestions);
    }

    if (showKey=="yes") { 
        $("#key").html("<h2>Key</h2>\n" +  quiz.formatAnswersHTML());
    } else {
        $("#key").html(linkKey);
    }

    if (showJson=="yes") { 
        $("#json").html("<h2>Json</h2>\n" +  "<textarea id='jsontextarea' rows='10' cols='30'>" + jsonString + "</textarea>");
    } else {
        $("#json").html(linkJSON);
    }
}
