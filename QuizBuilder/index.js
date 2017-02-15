var randomModule = require("random-bits");
var problems =  require("../problemTypes");
var qdSchema = require("../qdSchema");

exports.getQuestions = function(descriptor, randomStream) {
    var quizQuestions = [];
    var n = descriptor["questions"].length;

    for(var i = 0; i < n; ++i) {

        var item = descriptor.questions[i];

        if("question" in item) { //If this object is a question generator

            var problemTypeRequested = item.question;
            var params = (("parameters" in item) ? item.parameters : null);
            var repeat = (("repeat" in item) ? item.repeat : 1);
            
            var problemTypeObject = ((problemTypeRequested in problems.problemTypes) 
                                       ? problems.problemTypes[problemTypeRequested] : null);

            if (problemTypeObject == null) throw "Invalid Question Type: " + problemType + " is not a defined problem type.";
            //Generate the specified number of the specified type of question, add them to the array
            
            for(var j=0; j<repeat; j++) {
                var newQuestion = problemTypeObject.generate(randomStream, params);
                quizQuestions.push(newQuestion); 
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

    }

    return quizQuestions; 
};

exports.build = function(qd, seed) {
    var result = exports.validateQuizDescriptor(qd);
    if (result.length > 0)
        throw new Error("Invalid Quiz Descriptor");
    if (!exports.checkSeed(seed)) 
        throw new Error("Invalid Seed: " + seed);
    if (typeof qd === 'string')
        qd = JSON.parse(qd);
    
    var quiz = {};
    quiz.seed = seed;
    var s = parseInt(seed, 16);
    var randomStream = new randomModule.random(s);
    quiz.questions = exports.getQuestions(qd, randomStream);
	return quiz;
}

exports.validateQuizDescriptorString = function(qdString) {
    var qd;
    try {
        qd = JSON.parse(qdString);
    } catch(e) {
        return [{type:'InvalidJSON', path:[]}];
    }
    return exports.validateQuizDescriptor(qd);
}


var validates = require('ajv')({
    //useDefaults: true,
    v5: true,
    allErrors: true,
    verbose: true,
    format: 'full',
}).compile(qdSchema.qdSchema);



exports.validateQuizDescriptor = function(qd) {

    if (typeof qd === 'string')
        return exports.validateQuizDescriptorString(qd);


    if (validates(qd)) {
        return [];
    }
    return validates.errors;
}

exports.checkSeed = function(seed) {
    return (typeof seed === 'string' && seed.match(/^[a-fA-F0-9]{8}$/) !== null && seed.length == 8);
}












