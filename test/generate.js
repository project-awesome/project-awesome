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



	describe('generate', function() {

			var sandbox;
			beforeEach(function() {
					sandbox = sinon.sandbox.create();
				});
			afterEach(function() {
					sandbox.restore();
				});
			
			
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
