var QuizBuilder = require('../../QuizBuilder'),
	randomModule = require("random-bits");

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;


describe('QuizBuilder', function() {

	describe('build(descriptor, hexStringSeed)', function() {
		var sandbox;
		var validateQuizDescriptorStub, checkSeedStub, randomStub, getQuestionsStub, parseStub, parseIntStub;
		beforeEach(function() {
			sandbox = sinon.sandbox.create();
			parseIntStub = sandbox.stub(global, 'parseInt').returns("parsed-int-double");
			parseStub = sandbox.stub(JSON, 'parse').returns('parsed-qd-double');
			getQuestionsStub = sandbox.stub(QuizBuilder, 'getQuestions').returns('questions-double');
			randomStub = sandbox.stub(randomModule, 'random').returns({ "random":"double"});
			checkSeedStub = sandbox.stub(QuizBuilder, 'checkSeed').returns(true);
			validateQuizDescriptorStub = sandbox.stub(QuizBuilder, 'validateQuizDescriptor').returns([]);
		});
		afterEach(function() {
			sandbox.restore();
		});

		describe('when qd is invalid', function() {
			beforeEach(function() {
				validateQuizDescriptorStub.returns(['error-double']);
			});
			it('should throw an error', function() {
				expect(function(){ QuizBuilder.build('qd-double', 'seed-double'); }).to.throw(Error);
			});
		});

		describe('when seed is invalid', function() {
			beforeEach(function() {
				checkSeedStub.returns(false);
			});
			it('should throw an error', function() {
				expect(function(){ QuizBuilder.build("qd-double", "seed-double"); }).to.throw(Error);
			});
		});

		describe('return value', function() {
			var res;
			beforeEach(function() {
				res = QuizBuilder.build("qd-double", "seed-double");
			});
			it('should be an object', function() {
				expect(res).to.be.an('object');
			});
			describe('quizElements', function() {
				it('should be assign result of getQuestions', function() {
					expect(res.quizElements).to.equal("questions-double");
				});
			});
			describe('seed', function() {
				it('should be assigned the seed parameter', function() {
					expect(res.seed).to.equal("seed-double");
				});
			});
		});

		describe('randomStream', function() {
			it('should be constructed with the parsed hex seed', function() {
				QuizBuilder.build("qd-double", "seed-double");
				expect(parseIntStub.calledWith("seed-double", 16)).to.be.true;
				expect(randomStub.calledWith("parsed-int-double")).to.be.true;
			});
		});

		describe('get questions', function() {
			describe('when qd is a string', function() {
				it('should be passed the parsed qd and random stream', function() {
					QuizBuilder.build("qd-double", "seed-double");
					expect(getQuestionsStub.calledWith("parsed-qd-double", {"random":"double"})).to.be.true;
				});
			});
			describe('when qd is an object', function() {
				it('should be passed the qd and random stream', function() {
					QuizBuilder.build({"qd": "double"}, 'seed-double');
					expect(getQuestionsStub.calledWith({"qd": "double"}, {"random":"double"})).to.be.true;
				});
			});
		});
		describe('when qd is an object', function() {
			it("should not JSON.parse the qd", function() {
			});
		});

		describe('when qd is a string', function() {
			it("should not JSON.parse the qd", function() {
				QuizBuilder.build({"qd": "double"}, 'seed-double');
				expect(parseStub.called).to.be.false;
			});
		});

	});
});
