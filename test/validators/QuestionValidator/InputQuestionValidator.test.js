var expect = require("chai").expect;
var _und = require("underscore")._;
var QuestionValidator = require("../../../validators/QuestionValidator");

// For now require qd, and seed 

describe('QuestionValidator', function() {

	var validInputQuestion = {
		format: "input",
		question: "Why are you looking at the sample test question?",
		answer: ""
	};

	describe('Accepting Valid Questions', function() {

		it('should accept a valid question through the QuestionValidator', function() {
			expect(QuestionValidator.isValid(validInputQuestion)).to.be.true;
		});

	});

});



