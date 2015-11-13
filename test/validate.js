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


describe('validate', function() {

	var sandbox;
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});
	afterEach(function() {
		sandbox.restore();
	});

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
