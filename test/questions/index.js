var expect = require("chai").expect;
var questions = require("../../questions/index");

describe('questions',function() {

	it('should be that questionTypes exists and is an object', function(){
		expect(questions.questionTypes).to.exist;
		expect(questions.questionTypes).to.be.an("object");
	});

	describe('isValidQuestionType(questionType)', function() {

		it('should return true when the question type is a property in questionTypes', function() {
			expect(questions.isValidQuestionType('binHexOctDec')).to.be.true;
		});

		it('should return false for one that does not exist', function() {
			expect(questions.isValidQuestionType('nonexistantquestiontype')).to.be.false;
		});

	});

	describe('validateQuestionDescriptor(questionDescriptor)', function() {
		describe('valid cases', function() {
			describe('with parameters', function() {
				var questionDescriptor;
				before(function() {
					questionDescriptor = {
						repeat: 10,
						question: 'binHexOctDec',
						parameters: {
							conversions: [
								{ fromRad: 2, toRad: 10, minVal: 0, maxVal: 1024 }
							],
							spaceBinary: false
						}
					}
				});
				it('should return an empty array', function() {
					var errors = questions.validateQuestionDescriptor(questionDescriptor);
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(0);
				});
			});
			describe('without parameters', function() {
				var questionDescriptor;
				before(function() {
					questionDescriptor = {
						repeat: 10,
						question: 'binHexOctDec'
					}
				});
				it('should return an empty array', function() {
					var errors = questions.validateQuestionDescriptor(questionDescriptor);
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(0);
				});
			});
		});
		describe('invalid cases', function() {
			describe('question', function() {
				describe('when question is missing', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 1
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
						it('should be ["question"]', function() {
							expect(errors[0].path).to.eql(['question']);
						});
					});
				});
				describe('when question is not a string', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 1,
							question: true
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
						it('should be ["question"]', function() {
							expect(errors[0].path).to.eql(['question']);
						});
					});
				});
				describe('when question does not exist', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 1,
							question: 'notARealQuestion'
						});
					});
					it('should return an array of length 1', function() {
						expect(errors).to.be.an('array');
						expect(errors.length).to.equal(1);
					});
					describe('error type', function() {
						it('should be InvalidQuestionType', function() {
							expect(errors[0].type).to.equal('InvalidQuestionType');
						});
					});
					describe('error path', function() {
						it('should be ["question"]', function() {
							expect(errors[0].path).to.eql(['question']);
						});
					});
				});
			});
			describe('repeat', function() {
				describe('when repeat is missing', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							question: 'binHexOctDec'
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
						it('should be ["repeat"]', function() {
							expect(errors[0].path).to.eql(['repeat']);
						});
					});
				});
				describe('when repeat is not an integer', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 1.5,
							question: 'binHexOctDec'
						});
					});
					it('should return an array of length 1', function() {
						expect(errors).to.be.an('array');
						expect(errors.length).to.equal(1);
					});
					describe('error type', function() {
						it('should be ExpectedIntegerError', function() {
							expect(errors[0].type).to.equal('ExpectedIntegerError');
						});
					});
					describe('error path', function() {
						it('should be ["repeat"]', function() {
							expect(errors[0].path).to.eql(['repeat']);
						});
					});
				});
				describe('when repeat is less than 1', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 0,
							question: 'binHexOctDec'
						});
					});
					it('should return an array of length 1', function() {
						expect(errors).to.be.an('array');
						expect(errors.length).to.equal(1);
					});
					describe('error type', function() {
						it('should be MinimumValueError', function() {
							expect(errors[0].type).to.equal('MinimumValueError');
						});
					});
					describe('error path', function() {
						it('should be ["repeat"]', function() {
							expect(errors[0].path).to.eql(['repeat']);
						});
					});
				});
			});

			describe('parameters', function() {
				describe('when one of the parameters is invalid', function() {
					var errors;
					before(function() {
						errors = questions.validateQuestionDescriptor({
							repeat: 10,
							question: 'binHexOctDec',
							parameters: {
								spaceBinary: 'true'
							}
						});
					});
					it('should return an array of length 1', function() {
						expect(errors).to.be.an('array');
						expect(errors.length).to.equal(1);
					});
					describe('error type', function() {
						it('should equal "ExpectBooleanError"', function() {
							expect(errors[0].type).to.equal('ExpectedBooleanError');
						});
					});
					describe('error path', function() {
						it('should equal ["parameters","spaceBinary"]', function() {
							expect(errors[0].path).to.eql(['parameters', 'spaceBinary']);
						});
					});
				});
			});
		});
	});
});









