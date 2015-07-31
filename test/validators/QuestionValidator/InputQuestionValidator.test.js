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

	describe('Rejecting Invalid Questions', function() {

		describe('Invalid answer property', function() {

			it('should reject a question with a non-string answer property', function() {
				var q = _und.clone(validInputQuestion);
				q.answer = 1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

	});

});



