var QuizBuilder = require('../../QuizBuilder'),
	questionsModule = require('../../questions');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;


describe('QuizBuilder', function() {

	describe('validateQuizDescriptor(qd)', function() {

		var validateQDStringStub, sandbox;
		beforeEach(function() {
			sandbox = sinon.sandbox.create();
			validateQDStringStub = sandbox.stub(QuizBuilder, 'validateQuizDescriptorString');
		});
		afterEach(function() {
			sandbox.restore();
		});
		describe('when qd is a string', function() {
			it('should return the result of validateQuizDescriptorString', function() {
				validateQDStringStub.returns("validate-string-double");
				var res = QuizBuilder.validateQuizDescriptor("qd-double");
				expect(validateQDStringStub.calledOnce).to.be.true;
				expect(validateQDStringStub.calledWith("qd-double")).to.be.true;
				expect(res).to.equal("validate-string-double");
			});
		});
		describe('when qd is undefined', function() {
			it('should return an type error', function() {
				var errors = QuizBuilder.validateQuizDescriptor(undefined);
				expect(errors).to.be.an('array');
				expect(errors.length).to.equal(1);
				expect(errors[0].keyword).to.equal('type');	
			});
		});
		describe('when qd is not an object or a string', function() {
			it('should return an type error', function() {
				var errors = QuizBuilder.validateQuizDescriptor(1);
				expect(errors).to.be.an('array');
				expect(errors.length).to.equal(1);
				expect(errors[0].keyword).to.equal('type');			
			});
		});
		describe('version', function() {
			describe('when undefined', function() {
				var errors;
				before(function() {
					errors = QuizBuilder.validateQuizDescriptor({
						questions: []
					});
				});
				it('should return an array of length 1', function() {
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(1);
				});
				describe('error keyword', function() {
					it('should be "required"', function() {
						expect(errors[0].keyword).to.equal('required');
					});
				});
			});
			describe('when not a string', function() {
				var errors;
				before(function() {
					errors = QuizBuilder.validateQuizDescriptor({
						version: true,
						questions: []
					});
				});
				it('should return an array of length 1', function() {
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(1);
				});
				describe('error keyword', function() {
					it('should be "type"', function() {
						expect(errors[0].keyword).to.equal('type');
					});
				});
			});
		});
		describe('questions', function() {
			describe('when undefined', function() {
				var errors;
				before(function() {
					errors = QuizBuilder.validateQuizDescriptor({
						version: "0.1"
					});
				});
				it('should return an array of length 1', function() {
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(1);
				});
				describe('error keyword', function() {
					it('should be "required"', function() {
						expect(errors[0].keyword).to.equal('required');
					});
				});
			});
			describe('when not an array', function() {
				var errors;
				before(function() {
					errors = QuizBuilder.validateQuizDescriptor({
						version: "0.1",
						questions: {}
					});
				});
				it('should return an array of length 1', function() {
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(1);
				});
				describe('error keyword', function() {
					it('should be "type"', function() {
						expect(errors[0].keyword).to.equal('type');
					});
				});
			});
			describe('validating question descriptors', function() {
				// We should write some unit tests for this
				it('should produce an error', function() {
					var qdWithInvalidParam = {
					    "version" : "0.1",
					    "questions": [{
						    "question": "mc-change-of-base",
						    "repeat": 1,
						    "parameters": {
						    	"spaceBinary":"not a boolean"
						    }
						}]
					};
					var errors = QuizBuilder.validateQuizDescriptor(qdWithInvalidParam);
					expect(errors.length > 0).to.be.true;
				});
			});
		});
	});
});


