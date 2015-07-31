var expect = require("chai").expect;
var _und = require("underscore")._;
var QuestionValidator = require("../../../validators/QuestionValidator");

// For now require qd, and seed 

describe('QuestionValidator', function() {

	var validMCQuestion = {
		format: "multiple-choice",
		question: "Why are you looking at the sample test question?",
		choices: [
			"Because I am confused.",
			"To see what a valid question is.",
			"All of the above."
		],
		answer: 1
	};

	describe('Accepting Valid Questions', function() {

		it('should accept a valid question through the QuestionValidator', function() {
			expect(QuestionValidator.isValid(validMCQuestion)).to.be.true;
		});
		
	});

	describe('Rejecting Invalid Questions', function() {

		describe('Invalid choices property', function() {

			it('should reject a question with no choices property', function() {
				var q = _und.clone(validMCQuestion);
				delete q.choices;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question with a non-array choices property', function() {
				var q = _und.clone(validMCQuestion);
				q.choices = {};
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question with an empty choices array', function() {
				var q = _und.clone(validMCQuestion);
				q.choices = [];
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question if any of the choices is not a string', function() {
				var q = _und.clone(validMCQuestion);
				q.choices[1] = 1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid answer property', function() {

			it('should reject a question when the answer property is not an integer', function() {
				var q = _und.clone(validMCQuestion);
				q.answer = 1.1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question when the answer property is an index >= (# of choices)', function() {
				var q = _und.clone(validMCQuestion);
				q.answer = q.choices.length;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question when the answer property is an index < 0', function() {
				var q = _und.clone(validMCQuestion);
				q.answer = -1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

	});

});


