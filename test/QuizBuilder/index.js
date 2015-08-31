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

	describe('validateQuizDescriptor(qd)', function() {
		describe('valid qds', function() {
			var errors;
			before(function() {
				errors = QuizBuilder.validateQuizDescriptor({
					title: 'Sample Title',
					version: '0.1',
					quiz: [
						{
							question: 'binHexOctDec',
							repeat: 1,
							parameters: {
								spaceBinary: true
							}
						}
					]
				});
			});
			it('should return an empty array', function() {
				expect(errors).to.be.an('array');
				expect(errors.length).to.equal(0);
			});
		});
		describe('invalid qds', function() {
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
			describe('when qd is not an object', function() {
				var errors;
				before(function() {
					errors = QuizBuilder.validateQuizDescriptor('');
				});
				it('should return an array of length 1', function() {
					expect(errors).to.be.an('array');
					expect(errors.length).to.equal(1);
				});
				describe('error type', function() {
					it('should be ExpectedObjectError', function() {
						expect(errors[0].type).to.equal('ExpectedObjectError');
					});
				});
				describe('error path', function() {
					it('should be []', function() {
						expect(errors[0].path).to.eql([]);
					});
				});
			});
			describe('title', function() {
				describe('when undefined', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							version: '0.1',
							quiz: []
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
						it('should be ["title"]', function() {
							expect(errors[0].path).to.eql(['title']);
						});
					});
				});
				describe('when not a string', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							title: true,
							quiz: [],
							version: '0.1'
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
						it('should be ["title"]', function() {
							expect(errors[0].path).to.eql(['title']);
						});
					});
				});
			});
			describe('version', function() {
				describe('when undefined', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							title: "Sample Title",
							quiz: []
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
							title: 'Sample Title',
							version: true,
							quiz: []
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
			describe('quiz', function() {
				describe('when undefined', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							title: "Sample Title",
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
						it('should be ["quiz"]', function() {
							expect(errors[0].path).to.eql(['quiz']);
						});
					});
				});
				describe('when not an array', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							title: 'Sample Title',
							version: "0.1",
							quiz: {}
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
						it('should be ["quiz"]', function() {
							expect(errors[0].path).to.eql(['quiz']);
						});
					});
				});
			});
			describe('parameters', function() {
				describe('invalid', function() {
					var errors;
					before(function() {
						errors = QuizBuilder.validateQuizDescriptor({
							title: "Sample Title",
							version: "0.1",
							quiz: [
								{ question: 'changeOfBase', repeat:1 },
								{
									question: 'binHexOctDec',
									repeat: 1,
									parameters: {
										conversions: [
											{ fromRad:2, toRad:10, minVal:0, maxVal:63 },
											{ fromRad:1, toRad:10, minVal:0, maxVal:63 }
										]
									}
								}
							]
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
						it('should be ["quiz", 1, "parameters", "conversions", 1, "fromRad"]', function() {
							expect(errors[0].path).to.eql(["quiz", 1, "parameters", "conversions", 1, "fromRad"]);
						});
					});
				});
			});
		});
	});
});






