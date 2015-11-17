var QuizBuilder = require('../../QuizBuilder');

var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;


describe('QuizBuilder', function() {

	describe('checkSeed(seed)', function() {

		it('should reject any non string', function() {
			expect(QuizBuilder.checkSeed(parseInt('ABCD1234', 16))).to.be.false;
			expect(QuizBuilder.checkSeed(null)).to.be.false;
			expect(QuizBuilder.checkSeed(undefined)).to.be.false;
			expect(QuizBuilder.checkSeed(true)).to.be.false;
		});

		it('should reject strings that are not of length 8', function() {
			expect(QuizBuilder.checkSeed("1234567")).to.be.false;
			expect(QuizBuilder.checkSeed("12345678A")).to.be.false;
		});

		it('should accept hex strings of length 8', function() {
			expect(QuizBuilder.checkSeed("12345678")).to.be.true;
			expect(QuizBuilder.checkSeed("abcdef00")).to.be.true;
		});
	});
});
