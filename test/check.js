var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	projectAwesome = require('../'),
	MoodleExporter = require('../MoodleExporter'),
	questions = require('../questions'),
	QuizBuilder = require('../QuizBuilder');

chai.should();
chai.use(sinonChai);
var expect = chai.expect;


describe('check', function() {

	var sandbox;
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});
	afterEach(function() {
		sandbox.restore();
	});


		var checkSeedStub, isValidQuestionTypeStub;
		beforeEach(function() {
			checkSeedStub = sandbox.stub(QuizBuilder, 'checkSeed').returns("checkSeedReturn");
			isValidQuestionTypeStub = sandbox.stub(questions, 'isValidQuestionType').returns("isValidQuestionTypeReturn");
		});
		describe('seed', function() {
			it('should call QuizBuilder.checkSeed with appropriate parameter and return result', function() {
				var val = projectAwesome.check('seed', 'seedValue');
				expect(checkSeedStub.calledWith('seedValue')).to.be.true;
				expect(val).to.equal("checkSeedReturn");
			});
		});
		describe('questionType', function() {
			it('should call QuizBuilder.isValidQuestionType with appropriate parameter and return result', function() {
				var val = projectAwesome.check('questionType', 'qTypeValue');
				expect(isValidQuestionTypeStub.calledWith('qTypeValue')).to.be.true;
				expect(val).to.equal("isValidQuestionTypeReturn");
			});
		});
		describe('typedoesntexist', function() {
			it('should throw error', function() {
				try {
					projectAwesome.check('typedoesntexist', 'shouldntmatter');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'typedoesntexist');
				}
			});	
		});
	});
