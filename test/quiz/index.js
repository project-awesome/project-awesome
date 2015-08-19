
var expect = require("chai").expect;
var quizModule = require("../../quiz");
var randomModule = require("../../random");
/*
describe('#quiz', function() {

	var mockRS = {
	    nextIntRange: function(n) { 
		return retVals.shift();
	    }
	};
	var retVals = [0];

        var qd = {
	    "version" : "0.1",
	    "title" : "Example QuizJSON 1",
	    "quiz": [{
		    "question": "binHexOctDec",
		    "repeat": 1,
		}], 
	}; 


	it('should be possible to instantiate a quiz from a seed and quizDescriptor',
	   function() {
	       var q = new quizModule.Quiz(qd,{seed:0xABCD1234});
	       expect(q).to.be.an('object');
	   });

	it('should be possible to instantiate a quiz from a seed and RandomStream',
	   function() {
	       var rs = new randomModule.random(0xABCD1234);
	       var q = new quizModule.Quiz(qd,{randomStream: rs});
	       expect(q).to.be.an('object');
	   });

	it('should throw an exception when param is not an object',
	   function() {
	       
	       expect(function () {new quizModule.Quiz(qd,false);}).to.throw(Error,"2nd parameter to Quiz constructor should be an object");
	   });

	it('should throw an exception when params contains neither seed nor randomStream',
	   function() {
	       var expectedMsg = 
		   "2nd parameter to quiz constructor must contain either seed or randomStream"
	       expect(function () {new quizModule.Quiz(qd,{"foo":"bar"});}).to.throw(Error,expectedMsg);
	   });

	it('should produce known set of questions when given mocked randomStream',

	   function() {
	       retVals = [0,5,0,0];
	       var q = new quizModule.Quiz(qd,{randomStream:mockRS});
	       expect(q).to.be.an('object');
	       expect(q.questions).to.be.an('array');
	       expect(q.questions[0].question).to.equal('Convert 5 from base 10 to base 2.');
	       expect(q.questions[0].answer).to.equal('101');
	   });
	

    });

*/
