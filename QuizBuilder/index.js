var randomModule = require("random-bits");
var questionsModule =  require("../questions");

module.exports.getQuestions = function(descriptor, randomStream) {
    var questions = [];
    var n = descriptor["questions"].length;

    for(var i = 0; i < n; ++i) {

        var item = descriptor.questions[i];

        if("question" in item) { //If this object is a question generator

            var questionType = item.question;
            var params = (("parameters" in item) ? item.parameters : null);
            var repeat = (("repeat" in item) ? item.repeat : 1);
            
            var question = ((questionType in questionsModule.questionTypes) ? questionsModule.questionTypes[questionType] : null);

            if (question == null) throw "Invalid Question Type: " + questionType + " is not a defined quesiton.";
            //Generate the specified number of the specified type of question, add them to the array
            
            for(var j=0; j<repeat; j++) {
                var newQuestion = question.generate(randomStream, params);
                questions.push(newQuestion); 
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

    return questions; 
};

module.exports.build = function(qd, seed) {
    var result = module.exports.validateQuizDescriptor(qd);
    if (result.length > 0)
        throw new Error("Invalid Quiz Descriptor");
    if (!module.exports.checkSeed(seed)) 
        throw new Error("Invalid Seed: " + seed);
    if (typeof qd === 'string')
        qd = JSON.parse(qd);
    
    var quiz = {};
    quiz.seed = seed;
    var s = parseInt(seed, 16);
    var randomStream = new randomModule.random(s);
    quiz.questions = module.exports.getQuestions(qd, randomStream);
	return quiz;
}

module.exports.validateQuizDescriptorString = function(qdString) {
    var qd;
    try {
        qd = JSON.parse(qdString);
    } catch(e) {
        return [{type:'InvalidJSON', path:[]}];
    }
    return module.exports.validateQuizDescriptor(qd);
}

module.exports.validateQuizDescriptor = function(qd) {
    if (typeof qd === 'string')
        return module.exports.validateQuizDescriptorString(qd);
    
    var errors = [];
    if (qd === undefined)
        return [{type:'UndefinedQuizDescriptor', path:[]}];
    if (typeof qd !== 'object')
        return [{type:'ExpectedObjectOrStringError', path:[]}];

    if (!('version' in qd))
        errors.unshift({ type: 'RequiredError', path:['version']});
    else if (typeof qd.version !== 'string')
        errors.unshift({ type: 'ExpectedStringError', path:['version']});
    
    if (!('questions' in qd))
        errors.unshift({ type: 'RequiredError', path:['questions']});
    else if (!Array.isArray(qd.questions))
        errors.unshift({ type: 'ExpectedArrayError', path:['questions']});
    else {
        for (var i = 0; qd.questions.length > i; i++) {
            var qErrors = questionsModule.validateQuestionDescriptor(qd.questions[i]);
            qErrors = qErrors.map(function(qError) {
                qError.path = ['questions',i].concat(qError.path);
                return qError;
            });
            errors = errors.concat(qErrors);
        }
    }

    return errors;
}

module.exports.checkSeed = function(seed) {
    return (typeof seed === 'string' && seed.match(/^[a-fA-F0-9]{8}$/) !== null && seed.length == 8);
}












