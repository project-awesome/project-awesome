var expect = require("chai").expect;
var MoodleExporter = require('../../MoodleExporter');
var xml2js = require('xml2js');

describe('MoodleExporter', function() {

	describe('generateMoodleXML(questionType, count, questionName)', function() {

		describe('throwing errors', function() {

			describe('unimplemented questionType', function() {

				it('should throw an error.', function() {
					expect(function(){MoodleExporter.generateMoodleXML('someRandomQuestionType', 1, 'Question Name')})
					.to.throw(Error);
				});

			});

			describe('undefined questionName', function() {

				it("should throw an error", function() {
					expect(function() { MoodleExporter.generateMoodleXML('someRandomQuestionType', 1);})
					.to.throw(Error);
				});

			});
		});

		describe('successful conversion', function() {
			var xmlResult, xmlString;
			var questionType = 'changeOfBase';
			var count = 2;
			var questionName = 'Sample Question Name';

			it('should not throw an error', function() {
				expect(function(){MoodleExporter.generateMoodleXML(questionType, count, questionName);}).to.not.throw(Error);
			});

			beforeEach(function(done) {
				xmlString = MoodleExporter.generateMoodleXML(questionType, count, questionName);
				xml2js.parseString(xmlString, function (err, result) {
					xmlResult = result;
					done();
				});
			});

			describe('xml quiz tag', function() {
				it('should set the quiz tag', function() {
					expect(xmlResult.quiz).to.exist;
				});
			});

			describe('xml question', function() {
				it('should have the # of questions specified by the count parameter', function() {
					expect(xmlResult.quiz.question.length).to.equal(count);
				});
			});

			describe('xml question type', function() {
				it('should have set the question type attribute, for each question, to the questionType parameter', function() {
					for (var i = 0; xmlResult.quiz.question.length > i; i++)
						expect(xmlResult.quiz.question[i].$.type).to.equal('multichoice');
				});
			});

			describe('multiple-choice result', function() {
				var correctResultString = '<quiz><question type="multichoice"><name><text>Sample Question Name</text></name><questiontext><text>Convert 1111 from binary to decimal.</text></questiontext><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering><correctfeedback><text>Your answer is correct.</text></correctfeedback><partiallycorrectfeedback><text>Your answer is partially correct.</text></partiallycorrectfeedback><incorrectfeedback><text>Your answer is incorrect.</text></incorrectfeedback><answer fraction="0"><text>188</text><feedback><text></text></feedback></answer><answer fraction="0"><text>62</text><feedback><text></text></feedback></answer><answer fraction="100"><text>15</text><feedback><text></text></feedback></answer><answer fraction="0"><text>170</text><feedback><text></text></feedback></answer></question><question type="multichoice"><name><text>Sample Question Name</text></name><questiontext><text>Convert 95 from hexadecimal to decimal.</text></questiontext><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering><correctfeedback><text>Your answer is correct.</text></correctfeedback><partiallycorrectfeedback><text>Your answer is partially correct.</text></partiallycorrectfeedback><incorrectfeedback><text>Your answer is incorrect.</text></incorrectfeedback><answer fraction="0"><text>37</text><feedback><text></text></feedback></answer><answer fraction="100"><text>149</text><feedback><text></text></feedback></answer><answer fraction="0"><text>128</text><feedback><text></text></feedback></answer><answer fraction="0"><text>230</text><feedback><text></text></feedback></answer></question></quiz>';
				it('should return this', function() {
					expect(xmlString).to.equal(correctResultString);
				});
			});

		});

	});
});















