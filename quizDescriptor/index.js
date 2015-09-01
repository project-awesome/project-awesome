var _und = require("underscore")._;

var questionsModule =  require("../questions");


module.exports.isValidQDParams = function(params, questionType) {
	if (params == undefined) return true;
	if (typeof(params) !== "object") return false;

	var errors = questionsModule.questionTypes[questionType].validateParameters(params);
	return (errors.length === 0);
}

/**
 * Is this a valid QuizDescriptorQuestion object
 *
 * @param  {Object} object
 * @return {Boolean}
 */

module.exports.isValidQuizDescriptorQuestion = function(object) {
	var errors = questionsModule.validateQuestionDescriptor(object);
	return(errors.length === 0);
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

		if (!(_und.has(object, 'questions'))) return false;
		if (!(Array.isArray(object.questions))) return false;

		if (object.questions.length <= 0) return false;

		for (var i=0; i<object.questions.length; i++) {
		    if (!(module.exports.isValidQuizDescriptorQuestion(object.questions[i]))) return false;
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
    var n = quizObject["questions"].length;


    //Loop through the array of generating objects
    for(var i = 0; i < n; ++i) {

	var item = quizObject.questions[i];
	
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


