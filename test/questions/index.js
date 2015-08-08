var expect = require("chai").expect;

var questions = require("../../questions/index");

describe('questions',function() {

	it('should be that questionTypes exists and is an object', function(){
		expect(questions.questionTypes).to.exist;
		expect(questions.questionTypes).to.be.an("object");
	});

	describe('isValidQuestionType(questionType)', function() {

		it('should return true for binHexOctDec', function() {
			expect(questions.isValidQuestionType('binHexOctDec')).to.be.true;
		});

		it('should return true for changeOfBase', function() {
			expect(questions.isValidQuestionType('changeOfBase')).to.be.true;
		});

		it('should return false for one that does not exist', function() {
			expect(questions.isValidQuestionType('nonexistantquestiontype')).to.be.false;
		});

	});

});