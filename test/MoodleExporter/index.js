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
					expect(function() { MoodleExporter.generateMoodleXML('changeOfBase', 1);})
					.to.throw(Error);
				});

			});
		});

		describe('successful conversion', function() {
			var xmlResult, xmlString;
			var questionType, count, questionName;


			describe('general requirements', function() {

				beforeEach(function(done) {
					questionType = 'changeOfBase';
					count = 2;
					questionName = 'Sample Question Name';
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
			});


			describe('different formats', function() {

				describe('multiple choice format', function() {

					beforeEach(function(done) {
						questionType = 'changeOfBase';
						count = 2;
						questionName = 'Sample Question Name';
						xmlString = MoodleExporter.generateMoodleXML(questionType, count, questionName);
						xml2js.parseString(xmlString, function (err, result) {
							xmlResult = result;
							done();
						});
					});

					describe('xml question type', function() {
						it('should have set the question type attribute to multichoice', function() {
							for (var i = 0; xmlResult.quiz.question.length > i; i++)
								expect(xmlResult.quiz.question[i].$.type).to.equal('multichoice');
						});
					});
				});

				describe('numerical input format', function() {

					beforeEach(function(done) {
						questionType = 'binHexOctDec';
						count = 2;
						questionName = 'Sample Question Name';
						xmlString = MoodleExporter.generateMoodleXML(questionType, count, questionName);
						xml2js.parseString(xmlString, function (err, result) {
							xmlResult = result;
							done();
						});
					});

					describe('xml question type property', function() {

						it('should have set the question type attribute to numerical', function() {
							for (var i = 0; xmlResult.quiz.question.length > i; i++)
								expect(xmlResult.quiz.question[i].$.type).to.equal('numerical');
						});

					});

					describe('question.answer.text', function() {

						it('should exist', function() {
							console.log(JSON.stringify(xmlResult.quiz.question[0]));
							expect(xmlResult.quiz.question[0].answer[0].text).to.exist;
						});

					});
				});
			});

		});

	});
});















