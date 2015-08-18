
var _und = require("underscore")._;

var questionsModule =  require("../questions");



module.exports.isValidQDParams = function(params, questionType) {
	if (typeof(params) !== "object") return false;

	if (questionType == 'binHexOctDec') {
		if (!(_und.has(params, 'conversions'))) return false;
		if (!(Array.isArray(params.conversions))) return false;
		if (params.conversions.length < 1) return false;

		// validating each conversion object

		var length = params.conversions.length;
		for (var i = 0; length > i; i++) {
			var conversion = params.conversions[i];

			// must be 2, 10, 8, or 16
			if (!(_und.has(conversion, 'fromRad'))) return false;
			if (!(Number.isSafeInteger(conversion.fromRad))) return false;
			if (conversion.fromRad < 1) return false;

			// must be 2, 10, 8, or 16
			if (!(_und.has(conversion, 'toRad'))) return false;
			if (!(Number.isSafeInteger(conversion.toRad))) return false;
			if (conversion.toRad < 1) return false;

			// must be integer >= 0
			if (!(_und.has(conversion, 'minVal'))) return false;
			if (!(Number.isSafeInteger(conversion.minVal))) return false;
			if (conversion.minVal < 0) return false;

			// must be integer >= 0
			if (!(_und.has(conversion, 'maxVal'))) return false;
			if (!(Number.isSafeInteger(conversion.maxVal))) return false;
			if (conversion.maxVal < 0) return false;

			// fromRad and toRad must be different
			if (conversion.fromRad == conversion.toRad) return false;

			// maxVal must be > minVal
			if (conversion.maxVal < conversion.minVal) return false;
		}

	} else {
		return false;
	}
	return true;
}

/**
 * Is this a valid QuizDescriptorQuestion object
 *
 * @param  {Object} object
 * @return {Boolean}
 */

module.exports.isValidQuizDescriptorQuestion = function(object) {


		if (!(_und.has(object, 'question'))) return false;
		if (typeof(object.question) !== "string") return false;

		if (_und.has(object,'parameters') && !module.exports.isValidQDParams(object.parameters, object.question)) return false;


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




module.exports.produceArrayOfQuestions = function(quizObject, randomStream) {

//An interpreter for the QuizJSON notation

//Takes a QuizJSON object (not just the quiz array, as before)
//Returns an array of question objects

//TODO: Sanitize, validate, and otherwise protect against user error.

    var questions = [];
    var n = quizObject["quiz"].length;


    //Loop through the array of generating objects
    for(var i = 0; i < n; ++i) {

	var item = quizObject.quiz[i];
	
	if("question" in item) { //If this object is a question generator

	    var questionType = item.question;
	    var params = (("params" in item) ? item.params : {});
	    var repeat = (("repeat" in item) ? item.repeat : 1);
	    
	    var question = ((questionType in questionsModule.questionTypes) ? questionsModule.questionTypes[questionType] : null);

	    //Generate the specified number of the specified type of question, add them to the array
	    if(question != null) {
		for(var j=0; j<repeat; j++) {
		    var newQuestion = new question.f(randomStream,params);
		    questions.push(newQuestion); 
		}
	    }
	}

	/*	
	//Allows you to provide an array of question-generating objects (just like a quiz) to generate n questions
	//and choose k of those n at random.

	if("chooseK" in item) {
	    var k = item.chooseK;
	    var itemsArray = (("items" in item) ? item.items : []);
	    var newArray = produceArrayOfQuestions(itemsArray, randomStream); //Recursively parse the array passed to chooseK
	    //After this finishes newArray should consist solely of question objects
	    
	    randomStream.shuffle(newArray);
	    questions = questions.concat(newArray.slice(0,k)); //Grab the first k elements and add them to the questions array
	} // chooseK
	
	//Allows you to shuffle a list of questions.
	//Essentially equivalent to a chooseK where K is the total number of questions generated,
	//but this is a little clearer and nicer than having to use that trick.

	if("shuffle" in item) {
	    var itemsArray = (("items" in item) ? item.items : []);
	    var newArray = produceArrayOfQuestions(itemsArray, randomStream);
	    
	    randomStream.shuffle(newArray);
	    questions = questions.concat(newArray);		
	} // shuffle
	
	*/

    } // for 
    


    return questions; 

    };

// You'll notice it's possible for a user to put, say, a "shuffle"
// field in a "question" object in this case, if they didn't put an
// "items" field in, it just does nothing and acts like a normal
// question object.  that's cool, though, because those questions will
// be by default shuffled/random order anyway, so they should get what
// they wanted.

// It's also possible to put "shuffle" or "chooseK" with a valid items
// list in the same object as a regular "questions" object.  in this
// case that object will just do both functions at once. perhaps bad
// practice on their part (things should be specific and all), but it
// shouldn't present any problems here.


