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

describe('list', function() {

		describe('list someBadType', function() {
			it('should throw error', function() {
				try {
					projectAwesome.list('someBadType');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'someBadType');
				}
			});	
		});

		describe('list questionType', function() {
			it('should list the question types', function() {
				 result = projectAwesome.list('questionType');
				 expect(result).to.be.a('Array');
				 expect(result).to.eql(Object.keys(questions.questionTypes));
			});	
		});

	});
