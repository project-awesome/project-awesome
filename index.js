var MoodleExporter = require('./MoodleExporter');
var HTMLExporter = require('./HTMLExporter');
//var problemTypes = require('./problemTypes');
var formats = require('./formats');
var listers = require('./listers');
var checkers = require('./checkers');
var QuizBuilder = require('./QuizBuilder');


module.exports.list = function (type) {
	if (!(type in listers.listers)) 
		throw "Illegal Argument: " + type;
	return listers.listers[type]();
}

module.exports.check = function(type, value) {
	if (!(type in checkers.checkers))
		throw "Illegal Argument: " + type;
	return checkers.checkers[type](value);
}

module.exports.generate = function(type, qd, seed) {	
	if (!(type in formats.quizFormats))
		throw "Illegal Argument: " + type;
	return formats.quizFormats[type](qd, seed);
}

module.exports.validate = function(type, value) {
	var validators = {
		"qd": QuizBuilder.validateQuizDescriptor
	};
	if (!(type in validators))
		throw "Illegal Argument: " + type;
	return validators[type](value);
}








