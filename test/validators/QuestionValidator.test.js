var expect = require("chai").expect;
var _und = require("underscore")._;
var QuestionValidator = require("../../validators/QuestionValidator");

// For now require qd, and seed 

describe('QuestionValidator', function() {

	var validQuestion = {
		question: "Why are you looking at the sample test question?",
		answers: [
			"Because I am confused.",
			"To see what a valid question is.",
			"All of the above."
		],
		correct: 1
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

		describe('Invalid answers property', function() {

			it('should reject a question with no answers property', function() {
				var q = _und.clone(validQuestion);
				delete q.answers;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question with a non-array answers property', function() {
				var q = _und.clone(validQuestion);
				q.answers = {};
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question with an empty answers array', function() {
				var q = _und.clone(validQuestion);
				q.answers = [];
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question if any of the answers is not a string', function() {
				var q = _und.clone(validQuestion);
				q.answers[1] = 1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid correct property', function() {

			it('should reject a question with no correct property', function() {
				var q = _und.clone(validQuestion);
				delete q.correct;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question when the correct property is not an integer', function() {
				var q = _und.clone(validQuestion);
				q.correct = 1.1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question when the correct property is an index >= (# of answers)', function() {
				var q = _und.clone(validQuestion);
				q.correct = q.answers.length;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

			it('should reject a question when the correct property is an index < 0', function() {
				var q = _und.clone(validQuestion);
				q.correct = -1;
				expect(QuestionValidator.isValid(q)).to.be.false;
			});

		});

	});

});







