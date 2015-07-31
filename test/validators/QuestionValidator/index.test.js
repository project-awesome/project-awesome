var expect = require("chai").expect;
var _und = require("underscore")._;
var QuestionValidator = require("../../../validators/QuestionValidator");

// For now require qd, and seed 

describe('QuestionValidator', function() {

	var validQuestion = {
		format: "input",
		question: "Why are you looking at the sample test question?",
		answer: ""
	};

	describe('Accepting Valid Questions', function() {

		it('should accept a valid question', function() {
			expect(QuestionValidator.isValid(validQuestion)).to.be.true;
		});

	});

	describe('Rejecting Invalid Questions', function() {

		it('should reject non-object questions', function() {
			expect(QuestionValidator.isValid("non object")).to.be.false;
		});

		describe('Invalid question property', function() {

			it('should reject a question with no question property', function() {
				var q = _und.clone(validQuestion);
				delete q.question;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question with a non-string question property', function() {
				var q = _und.clone(validQuestion);
				q.question = 1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid format property', function() {

			it('should reject a question with no format property', function() {
				var q = _und.clone(validQuestion);
				delete q.format;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid answer property', function() {

			it('should reject a question with no answer property', function() {
				var q = _und.clone(validQuestion);
				delete q.answer;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

	});

});
