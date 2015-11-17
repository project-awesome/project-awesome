var QuizBuilder = require('../../QuizBuilder'),
	questionsModule = require('../../questions');

var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
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
			var errors;
			before(function() {
				errors = QuizBuilder.validateQuizDescriptor();
			});
			it('should return an array of length 1', function() {
				expect(errors).to.be.an('array');
				expect(errors.length).to.equal(1);
			});
			describe('error type', function() {
				it('should be UndefinedQuizDescriptor', function() {
					expect(errors[0].type).to.equal('UndefinedQuizDescriptor');
				});
			});
			describe('error path', function() {
				it('should be []', function() {
					expect(errors[0].path).to.eql([]);
				});
			});
		});
		describe('when qd is not an object or a string', function() {
			var errors;
			before(function() {
				errors = QuizBuilder.validateQuizDescriptor(1);
			});
			it('should return an array of length 1', function() {
				expect(errors).to.be.an('array');
				expect(errors.length).to.equal(1);
			});
			describe('error type', function() {
				it('should be ExpectedObjectOrStringError', function() {
					expect(errors[0].type).to.equal('ExpectedObjectOrStringError');
				});
			});
			describe('error path', function() {
				it('should be []', function() {
					expect(errors[0].path).to.eql([]);
				});
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
				describe('error type', function() {
					it('should be RequiredError', function() {
						expect(errors[0].type).to.equal('RequiredError');
					});
				});
				describe('error path', function() {
					it('should be ["version"]', function() {
						expect(errors[0].path).to.eql(['version']);
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
				describe('error type', function() {
					it('should be ExpectedStringError', function() {
						expect(errors[0].type).to.equal('ExpectedStringError');
					});
				});
				describe('error path', function() {
					it('should be ["version"]', function() {
						expect(errors[0].path).to.eql(['version']);
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
				describe('error type', function() {
					it('should be RequiredError', function() {
						expect(errors[0].type).to.equal('RequiredError');
					});
				});
				describe('error path', function() {
					it('should be ["questions"]', function() {
						expect(errors[0].path).to.eql(['questions']);
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
				describe('error type', function() {
					it('should be ExpectedArrayError', function() {
						expect(errors[0].type).to.equal('ExpectedArrayError');
					});
				});
				describe('error path', function() {
					it('should be ["questions"]', function() {
						expect(errors[0].path).to.eql(['questions']);
					});
				});
			});
			describe('validating question descriptors', function() {
				var errors;
				var validateQuestionDescriptorStub;
				beforeEach(function() {
					validateQuestionDescriptorStub = sinon.stub(questionsModule, 'validateQuestionDescriptor');
					validateQuestionDescriptorStub
					.withArgs('question-double-1').returns([])
					.withArgs('question-double-2').returns([{ path: "error-double-1"}, { path: "error-double-2"}])
					.withArgs('question-double-3').returns([]);
					errors = QuizBuilder.validateQuizDescriptor({
						version: "0.1",
						questions: [
							'question-double-1',
							'question-double-2',
							'question-double-3',
						]
					});
				});
				afterEach(function() {
					validateQuestionDescriptorStub.restore();
				});
				it("should call validateQuestionDescriptor for each question", function() {
					expect(validateQuestionDescriptorStub.calledWith('question-double-1')).to.be.true;
					expect(validateQuestionDescriptorStub.calledWith('question-double-2')).to.be.true;
					expect(validateQuestionDescriptorStub.calledWith('question-double-3')).to.be.true;
				});
				describe('errors', function() {
					it('should be an array of length 2', function() {
						expect(errors.length).to.equal(2);
					});
					describe('errors path', function() {
						it('should include index and correct path', function() {
							expect(errors[0].path).to.eql(['questions', 1, "error-double-1"]);
							expect(errors[1].path).to.eql(['questions', 1, "error-double-2"]);
						});
					});
				});
			});
		});
	});
});


