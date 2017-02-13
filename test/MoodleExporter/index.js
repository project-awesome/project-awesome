var expect = require("chai").expect;
var MoodleExporter = require('../../MoodleExporter');
var xml2js = require('xml2js');

describe('MoodleExporter', function () {
    var validSeed = 'abcd1234';
    var validQD = {
        "version": "0.1",
        "questions": [{
            "question": "mc-change-of-base",
            "repeat": 2,
        }]
    };
    describe('generateMoodleXML(qd, seed)', function () {
        describe('throwing errors', function () {
            describe('when qd is invalid problemType', function () {
                it('should throw an error.', function () {
                    expect(function () { 
                        MoodleExporter.generateMoodleXML({ "invalid": "qd" }, validSeed) 
                    }).to.throw(Error);
                });

            });
            describe('invalid seed', function () {
                it("should throw an error", function () {
                    expect(function () { 
                        MoodleExporter.generateMoodleXML(validQD, "invalid-seed"); 
                    }).to.throw(Error);
                });
            });
        });

        describe('successful conversion', function () {
            var xmlResult, xmlString;
            describe('general requirements', function () {
                beforeEach(function (done) {
                    try {
                        xmlString = MoodleExporter.generateMoodleXML(validQD, validSeed);
                    } catch(e) {
                        console.log(e);
                        throw e;
                    }
                    xml2js.parseString(xmlString, function (err, result) {
                        xmlResult = result;
                        done();
                    });
                });

                describe('xml quiz tag', function () {
                    it('should set the quiz tag', function () {
                        expect(xmlResult.quiz).to.exist;
                    });
                });

                describe('xml question', function () {
                    it('should have the # of questions specified by the count parameter', function () {
                        expect(xmlResult.quiz.question.length).to.equal(2);
                    });
                });

            });
            
            describe('multiple problemTypes', function () {

                beforeEach(function (done) {

                    var qd = {
                        "version": "0.1",
                        "questions": [{
                            "question": "mc-change-of-base",
                            "repeat": 1,
                        },
                        {
                            "question": "fr-change-of-base",
                            "repeat": 1,
                        }]
                    };

                    xmlString = MoodleExporter.generateMoodleXML(qd, validSeed);
                    xml2js.parseString(xmlString, function (err, result) {
                        xmlResult = result;
                        done();
                    });
                });

                
                describe('first question title', function () {
                    it('should be Change of Base Multiple Choice', function () {
                        expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Change of Base Multiple Choice");
                    });
                });


                describe('second question title', function () {
                    it('should be Change of Base Free Response', function () {
                        expect(xmlResult.quiz.question[1].name[0].text[0]).to.equal("Change of Base Free Response");
                    });
                });

            });


            describe('different formats', function () {

                describe('multiple choice format', function () {

                    beforeEach(function (done) {
                        problemTypeRequested  = 'mc-change-of-base';
                        count = 2;
                        questionName = 'Sample Question Name';

                        var qd = {
                            "version": "0.1",
                            "questions": [{
                                "question": problemTypeRequested,
                                "repeat": count,
                            }]
                        };
                        xmlString = MoodleExporter.generateMoodleXML(qd, validSeed);
                        xml2js.parseString(xmlString, function (err, result) {
                            xmlResult = result;
                            done();
                        });
                    });

//TODO: fix output type references -- previously may have been question type MC vs free response
                    describe('xml output type', function () {
                        it('should have set the output type attribute to multichoice', function () {
                            for (var i = 0; xmlResult.quiz.question.length > i; i++)
                                expect(xmlResult.quiz.question[i].$.type).to.equal('multichoice');
                        });
                    });

                    describe('xml question title', function () {
                        it('should be Change of Base Multiple Choice', function () {
                            expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Change of Base Multiple Choice");
                        });
                    });
                });

                describe('input format', function () {

                    beforeEach(function (done) {
                        problemTypeRequested = 'fr-change-of-base';
                        count = 2;
                        questionName = 'Sample Question Name';
                        var qd = {
                            "version": "0.1",
                            "questions": [{
                                "question": problemTypeRequested,
                                "repeat": count,
                            }]
                        };
                        xmlString = MoodleExporter.generateMoodleXML(qd, validSeed);
                        xml2js.parseString(xmlString, function (err, result) {
                            xmlResult = result;
                            done();
                        });
                    });

//TODO: fix output type references -- previously may have been question type MC vs free response
//TODO: shortanswer vs free-response
                    describe('xml output type property', function () {

                        it('should have set the output type attribute to shortanswer', function () {
                            for (var i = 0; xmlResult.quiz.question.length > i; i++)
                                expect(xmlResult.quiz.question[i].$.type).to.equal('shortanswer');
                        });

                    });

                    describe('xml question title', function () {
                        it('should be Change of Base Free Response', function () {
                            expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Change of Base Free Response");
                        });
                    });

                    describe('question.answer.text', function () {

                        it('should exist', function () {
                            expect(xmlResult.quiz.question[0].answer[0].text).to.exist;
                        });

                    });
                });
            });

        });

    });
});















