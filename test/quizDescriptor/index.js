
var expect = require("chai").expect;

var _und = require("underscore")._;

var quizDescriptor = require("../../quizDescriptor/index");
var isValid = quizDescriptor.isValidQuizDescriptorQuestion;
var isValidJSON = quizDescriptor.isValidQuizDescriptorQuestionJSON;


describe('#isValidQuizDescriptorQuestion', function() {
         
 
 var validDescriptors = 
    [
     {
	 "question": "numberConversions",
	 "parameters": {"questionType": "bin2hex", "minValue": 0, "maxValue": 255},
	 "repeat": 5
     },
     {
	 "question": "orderOfOperations",
         "repeat": 5
     },
     ];

 var invalidDescriptors = 
  [
   {},
   { "foo":"bar" }
   ];


it('should know that a QuizDescriptorQuestions must have a question property', function(){
  var d = _und.clone(validDescriptors[0]);
  delete d.question;
  expect(isValid(d)).to.be.false;
});

it('should know that a QuizDescriptorQuestions question must be a string', function(){
  var d = _und.clone(validDescriptors[0]);
  d.question = false;
  expect(isValid(d)).to.be.false;
});

it('should know that parameters are an optional property', function(){
  var d = _und.clone(validDescriptors[0]);
  delete d.parameters;
  expect(isValid(d)).to.be.true;
});


it('should know that a QuizDescriptorQuestions parameters, if present, must be an object', function(){
  var d = _und.clone(validDescriptors[0]);
  d.parameters = false;
  expect(isValid(d)).to.be.false;
});

it('should know that a QuizDescriptorQuestions repeat property must be number', function(){
  var d = _und.clone(validDescriptors[0]);
  d.repeat = false;
  expect(isValid(d)).to.be.false;
});

it('should know that a QuizDescriptorQuestions repeat property must be an integer', function(){
  var d = _und.clone(validDescriptors[0]);
  d.repeat = 2.5;
  expect(isValid(d)).to.be.false;
});

it('should know that a QuizDescriptorQuestions repeat property must >= 1', function(){
  var d = _und.clone(validDescriptors[0]);
  d.repeat = 0;
  expect(isValid(d)).to.be.false;
});

var validDescriptorStrings = validDescriptors.map(function(d) {
  return JSON.stringify(d); 
});

var invalidDescriptorStrings = invalidDescriptors.map(function(d) {
  return JSON.stringify(d); 
});

var notEvenJSONStrings = ['bar','}{','<>'];


it('should know that the JSON for valid QuizDescriptorQuestions are valid', function(){
	validDescriptorStrings.forEach( function (s) {
		expect(isValidJSON(s)).to.be.true;
	    });
    });

it('should know that strings that aren\'t even JSON are invalid', function(){
	notEvenJSONStrings.forEach( function (s) {
		expect(isValidJSON(s)).to.be.false;
	    });
    });


it('should know that the JSON for invalid QuizDescriptorQuestions are invalid', function(){
	invalidDescriptorStrings.forEach( function (s) {
		expect(isValidJSON(s)).to.be.false;
	    });
    });

});



// Mocha cheatsheet
/*
describe('test suite', function () {
  beforeEach(function() { 
  	// ...
  });
  afterEach(function() { 
  	// ...
  });

  before(function() { 
  	// ...
  });
  after(function() { 
  	// ...
  });

  it('a basic test', function() { 
  	// ...
  });

  it('a test with a promise', function() {
    return somePromiseObject; });

  it('an asynchronous test', function(next) {
    if (success) { next(); } else { next(error); }
  });

  xit('use "xit" for pending tests', function() { 
  	// ...
  });
});
*/

// Chai cheatsheet
/*
expect(3).to.eql(2);

expect(obj).to.be.a('string');
expect(obj).to.be.null;
expect(obj).to.be.true;
expect(obj).to.be.false;
expect(obj).to.be.undefined;

expect(list).to.include("item");
expect(list).to.have.length(3);
expect(list).to.have.length.gt(0);
*/






