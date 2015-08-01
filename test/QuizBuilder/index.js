var expect = require("chai").expect;
var QuizValidator = require('../../validators/QuizValidator');
var QuizBuilder = require('../../QuizBuilder');

describe('QuizBuilder', function() {

	it('should produce a valid quiz', function() {
		var qd = {
		    "version" : "0.1",
		    "title" : "Example QuizJSON 1",
		    "quiz": [{
			    "question": "binHexOctDec",
			    "repeat": 5,
			}]
		}; 

		var quiz = QuizBuilder.build(qd, 1, 1);
		console.log(quiz);
		expect(QuizValidator.isValid(quiz)).to.be.true;
	});




});