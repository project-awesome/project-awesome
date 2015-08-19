var expect = require("chai").expect;
var QuizValidator = require('../../validators/QuizValidator');
var QuizBuilder = require('../../QuizBuilder');
var randomModule = require("../../random");

describe('QuizBuilder', function() {
	var qd = {
	    "version" : "0.1",
	    "title" : "Example QuizJSON 1",
	    "quiz": [{
		    "question": "binHexOctDec",
		    "repeat": 5,
		}]
	};

	describe('build(descriptor, id, hexStringSeed)', function() {

		it('should produce a valid quiz', function() {
			var quiz = QuizBuilder.build(qd, 1, '1234abef');
			expect(QuizValidator.isValid(quiz)).to.be.true;
		});

		describe('invalid descriptor', function() {
			var invalidQD = {
			    "ayyyy" : "lmao"
			};
			it('should throw an error', function() {
				expect(function(){ QuizBuilder.build(invalidQD, 1, '1234abcd'); }).to.throw(Error);
			});
		});

		describe('invalid seed', function() {
			it('should throw an error', function() {
				expect(function(){ QuizBuilder.build(qd, 1, '1234'); }).to.throw(Error);
			});
		});

	});


	describe('getQuestions(descriptor, randomStream)', function() {
		var retVals = [];
		var mockRS = {
			nextIntRange: function(n) { 
				return retVals.shift();
			}
		};

		it('should produce known set of questions when given randomStream', function() {
			retVals = [0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			var questions = QuizBuilder.getQuestions(qd, mockRS);
			expect(questions).to.be.an('array');
			expect(questions.length).to.equal(qd.quiz[0].repeat);
			expect(questions[0].question).to.equal('Convert 5 from base 10 to base 2.');
			expect(questions[0].answer).to.equal('101');
		});

	});


});