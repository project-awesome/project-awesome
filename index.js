
var _und = require("underscore")._;

/**
 * Is this a valid QuizDescriptorQuestion object
 *
 * @param  {Object} object
 * @return {Boolean}
 */
module.exports = {};


module.exports.isValidQuizDescriptorQuestion = function(object) {


		if (!(_und.has(object, 'question'))) return false;
		if (typeof(object.question) !== "string") return false;

		if (_und.has(object,'parameters') && typeof(object.parameters) !== "object") return false;

		if (!(_und.has(object, 'repeat'))) return false;
		if (typeof(object.repeat) !== "number") return false;
		if (!(Number.isInteger(object.repeat))) return false;
		if ((object.repeat < 1)) return false;

		return true;
};


/**
 * Is this JSON for a valid QuizDescriptorQuestion object
 *
 * @param  {String} s
 * @return {Boolean}
 */

 module.exports.isValidQuizDescriptorQuestionJSON = function(s) {

    	var object;
    	try {
    	   object = JSON.parse(s);
    	} catch (e) {
	    return false;
    	}			

		return module.exports.isValidQuizDescriptorQuestion(object);
    };

/**
 * Is this a valid QuizDescriptor object
 *
 * @param  {Object} object
 * @return {Boolean}
 */

module.exports.isValidQuizDescriptor = function (object) {

		if (!(_und.has(object, 'version'))) return false;
		if (typeof(object.version) !== "string") return false;

		if (!(_und.has(object, 'title'))) return false;
		if (typeof(object.title) !== "string") return false;

		if (!(_und.has(object, 'quiz'))) return false;
		if (!(Array.isArray(object.quiz))) return false;

		if (object.quiz.length <= 0) return false;

		for (var i=0; i<object.quiz.length; i++) {
			console.log("object.quiz[i] = " + JSON.stringify(object.quiz[i]));
		    if (!(module.exports.isValidQuizDescriptorQuestion(object.quiz[i]))) return false;
		} 

		return true;
    };

/**
 * Is this JSON for a valid QuizDescriptor object
 *
 * @param  {String} s
 * @return {Boolean}
 */

 module.exports.isValidQuizDescriptorJSON = function(s) {

    	var object;
    	try {
    	   object = JSON.parse(s);
    	} catch (e) {
    		return false;
    	}

    	return module.exports.isValidQuizDescriptor(object);

    };
