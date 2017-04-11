var randomModule = require("random-bits");
var problems =  require("../problemTypes");
var qdSchema = require("../qdSchema");

exports.getQuestions = function(descriptor, randomStream) {
    var quizQuestions = [];
    var n = descriptor["quizElements"].length;

    for(var i = 0; i < n; i++) {

        var item = descriptor.quizElements[i];
        var newQuestions = handleQuizElement(item, randomStream);
        quizQuestions = quizQuestions.concat(newQuestions);
        
    }
    return quizQuestions;
};
    
// quizElement is json fragment for either a problem,label,repeat,shuffle or choose
// return an array of new questions (even if there is only 1)
handleQuizElement = function(quizElement, randomStream) {
    var newQuestions = [];
    if("problemType" in quizElement) { // this is a single question
        var problemTypeRequested = quizElement.problemType;
        var problemTypeObject = ((problemTypeRequested in problems.problemTypes) 
                                       ? problems.problemTypes[problemTypeRequested] : null);
        if (problemTypeObject == null) throw "Invalid Question Type: " + problemTypeRequested + " is not a defined problem type.";
        //Generate an actual question, add it to the array
        var newQuestion = problemTypeObject.generate(randomStream, quizElement);
        return [newQuestion]; 
    }
    else if ("label" in quizElement) { //
        return [quizElement];
    }
    else if("repeat" in quizElement) { //
        var count = quizElement["repeat"];
        var newQuestions = [];
        for (i=0; i < count; i++) {
            newQuestions = newQuestions.concat(handleQuizElement(quizElement["items"][0], randomStream));
        }
        return newQuestions;
    }
    else if("shuffle" in quizElement) { //
        randomStream.shuffle(quizElement["shuffle"]);
        var newQuestions = [];
        for (i=0; i < quizElement["shuffle"].length ; i++) {
            newQuestions = newQuestions.concat(handleQuizElement(quizElement["shuffle"][i], randomStream));
        }
        return newQuestions;
    }
    else if("choose" in quizElement) { //
        var newQuestions = [];
        // get out the value for choose call it count
        var count = quizElement["choose"];
        if (count > quizElement["items"].length) {
           newQuestions.concat({"warning": "choose requested count greater than provided items"}) 
           count = quizElement["items"].length;
        }
        // shuffle the order of the items in the array
        randomStream.shuffle(quizElement["items"]);
        // for the first count of them, call handleQuizElement
        for (i=0; i < count; i++) {
            newQuestions = newQuestions.concat(handleQuizElement(quizElement["items"][i], randomStream));
        }
        return newQuestions;
    } else {
        
        return [{"error": "unknown case in handleQuizElement"}];
    }
}


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












