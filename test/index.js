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

describe('project-awesome api', function() {
	var sandbox;
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});
	afterEach(function() {
		sandbox.restore();
	});

	describe('check', function() {
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
	describe('generate', function() {
		var buildStub, generateMoodleXMLStub;
		beforeEach(function() {
			buildStub = sandbox.stub(QuizBuilder, 'build').returns("buildReturn");
			generateMoodleXMLStub = sandbox.stub(MoodleExporter, 'generateMoodleXML').returns("generateMoodleXMLReturn");
		});
		describe('json', function() {
			it('should call QuizBuilder.build with appropriate parameter and return result', function() {
				var val = projectAwesome.generate('json', 'qdValue', 'seedValue');
				expect(buildStub.calledWith('qdValue', 'seedValue')).to.be.true;
				expect(val).to.equal("buildReturn");
			});
		});
		describe('moodleXML', function() {
			it('should call MoodleExporter.generateMoodleXML with appropriate parameter and return result', function() {
				var val = projectAwesome.generate('moodleXML', 'qdValue', 'seedValue');
				expect(generateMoodleXMLStub.calledWith('qdValue', 'seedValue')).to.be.true;
				expect(val).to.equal("generateMoodleXMLReturn");
			});
		});
		describe('typedoesntexist', function() {
			it('should throw error', function() {
				try {
					projectAwesome.generate('typedoesntexist', 'shouldntmatter', 'shouldntmatter');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'typedoesntexist');
				}
			});	
		});
	});
	describe('validate', function() {
		var validateQuizDescriptorStub;
		beforeEach(function() {
			validateQuizDescriptorStub = sandbox.stub(QuizBuilder, 'validateQuizDescriptor').returns("validateQuizDescriptorReturn");
		});
		describe('qd', function() {
			it('should call QuizBuilder.validateQuizDescriptor with appropriate parameter and return result', function() {
				var val = projectAwesome.validate('qd', 'qdValue');
				expect(validateQuizDescriptorStub.calledWith('qdValue')).to.be.true;
				expect(val).to.equal("validateQuizDescriptorReturn");
			});
		});
		describe('typedoesntexist', function() {
			it('should throw error', function() {
				try {
					projectAwesome.validate('typedoesntexist', 'shouldntmatter');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'typedoesntexist');
				}
			});	
		});
	});
});