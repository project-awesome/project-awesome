var questions = require('../problemTypes');
var formats = require('../formats');
var checkers = require('../checkers');

var listers = {
		"questionType" : function () {
			return Object.keys(questions.problemTypes);
		},
		"quizFormat" : function (){
			return Object.keys(formats.quizFormats);
		},
		"checkableType" : function(){
			return Object.keys(checkers.checkers);
		},
		"listableType" : function(){
			return Object.keys(listers)
		}
};

module.exports.listers = listers;
