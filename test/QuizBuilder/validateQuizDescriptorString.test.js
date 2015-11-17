var QuizBuilder = require('../../QuizBuilder');

var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	expect = chai.expect;


describe('QuizBuilder', function() {

	describe('validateQuizDescriptorString(qdString)', function() {
		var validateQuizDescriptorStub, parseStub;
		beforeEach(function() {
			validateQuizDescriptorStub = sinon.stub(QuizBuilder, 'validateQuizDescriptor');
			parseStub = sinon.stub(JSON, 'parse').returns("parsed-qd-double");
		});
		afterEach(function() {
			validateQuizDescriptorStub.restore();
			parseStub.restore();
		});
		it ("should call JSON.parse and pass qdString", function() {
			QuizBuilder.validateQuizDescriptorString("qdstring-double");
			expect(parseStub.calledOnce).to.be.true;
			expect(parseStub.calledWith("qdstring-double")).to.be.true;
		});
		it ("should pass the result of JSON.parse into validateQuizDescriptor", function() {
			QuizBuilder.validateQuizDescriptorString("qdstring-double");
			expect(validateQuizDescriptorStub.calledOnce).to.be.true;
			expect(validateQuizDescriptorStub.calledWith("parsed-qd-double")).to.be.true;
		});
		it ("should return the result of validateQuizDescriptor", function() {
			validateQuizDescriptorStub.returns("errors-double");
			var errors = QuizBuilder.validateQuizDescriptorString("qdstring-double");
			expect(errors).to.equal("errors-double");
		});
		describe('when JSON.parse throws an error', function() {
			it("should return [{type:'InvalidJSON', path:[]}]", function() {
				parseStub.throws();
				var errors = QuizBuilder.validateQuizDescriptorString("qdstring-double");
				expect(errors).to.eql([{type:'InvalidJSON', path:[]}]);
			});
		});
	});

});



