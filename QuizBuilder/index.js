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
                                       // that might be a set of labels and questions
        var problemTypeRequested = quizElement.problemType;
        var problemTypeObject = ((problemTypeRequested in problems.problemTypes) 
                                       ? problems.problemTypes[problemTypeRequested] : null);
        if (problemTypeObject == null) 
          throw (new Error("Invalid Question Type: " + problemTypeRequested + " is not a defined problem type."));

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
        var count = quizElement["choose"];
        if (count > quizElement["items"].length) {
           // this is not handled properly 
           //  -- filed issue #26 about this in project-awesome/project-awesome repo
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
    } else if(quizElement instanceof Array) {

        // for now this flattens any inner lists
        // probably we want to keep some notion of nesting in the final JSON so that various
        // formatters (HTML, latex) can add nested numbering 
        // we should talk about this XXX
        var newQuestions = [];
        for (i=0; i< quizElement.length; i++) {
            newQuestions = newQuestions.concat(handleQuizElement(quizElement[i], randomStream));
        }
        return newQuestions;
    } else {
        
        return [{"error": "unknown case in handleQuizElement"}];
    }
}


exports.build = function(qd, seed) {
    var quiz = {};
    quiz.errors = [];
    quiz.warnings = [];

    var result = exports.validateQuizDescriptor(qd);
    // needs attention for error handling XXX
    if (result.length > 0)
        throw new Error("Invalid Quiz Descriptor");
    if (!exports.checkSeed(seed)) 
        throw new Error("Invalid Seed: " + seed);
    if (typeof qd === 'string')
        qd = JSON.parse(qd);
    
    quiz.seed = seed;
    var s = parseInt(seed, 16);
    var randomStream = new randomModule.random(s);
    quiz.quizElements = exports.getQuestions(qd, randomStream);
    quiz.version = qd.version;
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












