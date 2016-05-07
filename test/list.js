var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

var projectAwesome = require('../'),
	questions = require('../questions'),
	formats = require('../formats'),
	checkers = require('../checkers');;

describe('list', function() {

		describe('list someBadType', function() {
			it('should throw error', function() {
				try {
					projectAwesome.list('someBadType');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'someBadType');
				}
			});	
		});

		describe('list questionType', function() {
			it('should list the question types', function() {
				 result = projectAwesome.list('questionType');
				 expect(result).to.be.a('Array');
				 expect(result).to.eql(Object.keys(questions.questionTypes));
			});	
		});

		describe('list quizFormat', function() {
			it('should list the quiz formats', function() {
				 result = projectAwesome.list('quizFormat');
				 expect(result).to.be.a('Array');
				 expect(result).to.eql(Object.keys(formats.quizFormats));
			});	
		});

		describe('list checkableType', function() {
			it('should list the quiz formats', function() {
				 result = projectAwesome.list('checkableType');
				 expect(result).to.be.a('Array');
				 expect(result).to.eql(Object.keys(checkers.checkers));
			});	
		});

	});
