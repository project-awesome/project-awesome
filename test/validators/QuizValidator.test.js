var expect = require("chai").expect;
var _und = require("underscore")._;
var QuizValidator = require("../../validators/QuizValidator");

// For now require qd and seed to be integers

describe('QuizValidator', function() {
	var validQuestion = {
		format: "multiple-choice",
		question: "Why are you looking at the sample test question?",
		choices: [
			"Because I am confused.",
			"To see what a valid question is.",
			"All of the above."
		],
		answer: 1
	};
	var validQuiz = {
		qd: 1,
		seed: 1,
		title: "Sample Quiz Title",
		questions: [ _und.clone(validQuestion) ]
	};

	describe('Accepting Valid Quizzes', function() {

		it('should accept a valid quiz', function() {
			expect(QuizValidator.isValid(validQuiz)).to.be.true;
		});

	});

	describe('Rejecting Invalid Quizzes', function() {

		it('should reject non-object quizzes', function() {
			expect(QuizValidator.isValid("non object")).to.be.false;
		});

		describe('Invalid qd property', function() {

			it('should reject quizzes with no qd property', function() {
				var q = _und.clone(validQuiz);
				delete q.qd;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with non-integer qd property', function() {
				var q = _und.clone(validQuiz);
				q.qd = 1.1;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with negative integer qd property', function() {
				var q = _und.clone(validQuiz);
				q.qd = -1;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid seed property', function() {

			it('should reject quizzes with no seed property', function() {
				var q = _und.clone(validQuiz);
				delete q.seed;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with non-integer seed property', function() {
				var q = _und.clone(validQuiz);
				q.seed = 1.1;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with negative integer seed property', function() {
				var q = _und.clone(validQuiz);
				q.seed = -1;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid title property', function() {

			it('should reject quizzes with no title property', function() {
				var q = _und.clone(validQuiz);
				delete q.title;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with non-string title property', function() {
				var q = _und.clone(validQuiz);
				q.title = 1;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

		});

		describe('Invalid questions property', function() {

			it('should reject quizzes with no questions property', function() {
				var q = _und.clone(validQuiz);
				delete q.questions;
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with non-array questions property', function() {
				var q = _und.clone(validQuiz);
				q.questions = {};
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes with empty questions array', function() {
				var q = _und.clone(validQuiz);
				q.questions = [];
				expect(QuizValidator.isValid(q)).to.be.false;
			});

			it('should reject quizzes that contain an invalid question', function() {
				var q = _und.clone(validQuiz);
				var question = _und.clone(validQuestion);
				delete question.choices;
				q.questions.push(question);
				expect(QuizValidator.isValid(q)).to.be.false;
			});

		});

	});

});



















