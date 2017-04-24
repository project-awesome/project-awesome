var expect = require("chai").expect;
var MoodleExporter = require('../../MoodleExporter');
var xml2js = require('xml2js');

describe('MoodleExporter', function () {
    var validSeed = 'abcd1234';
    var validQD = {
        "version": "0.1",
        "quizElements": [{
             "repeat": 2,
             "items" : [{
                "problemType": "change-of-base"
              }]
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
                        "quizElements": [{
                            "problemType": "change-of-base",
                            "title": "Title supplied in QD",
                            "params": {"outputType":"mc"}
                        },
                        {
                            "problemType": "change-of-base",
                        }]
                    };

                    xmlString = MoodleExporter.generateMoodleXML(qd, validSeed);
                    xml2js.parseString(xmlString, function (err, result) {
                        xmlResult = result;
                        done();
                    });
                });

                
                describe('first question title', function () {
                    it('should be Title supplied in QD', function () {
                        expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Title supplied in QD");
                    });
                });


                describe('second question title', function () {
                    it('should be Change of Base', function () {
                        expect(xmlResult.quiz.question[1].name[0].text[0]).to.equal("Change of Base");
                    });
                });

            });


            describe('different formats', function () {

                describe('multiple choice format', function () {

                    beforeEach(function (done) {

                        var qd = {
                            "version": "0.1",
                            "quizElements": [{
                                "repeat": 22,
                                "items" : [{"problemType": "change-of-base",
                                            "params": {"outputType": "mc"}}]
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
                            expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Change of Base");
                        });
                    });
                });

                describe('input format', function () {

                    beforeEach(function (done) {
                        var qd = {
                            "version": "0.1",
                            "quizElements": [{
                                "repeat": 2,
                                "items": [{
                                "problemType": 'change-of-base',
                                "title": "Problem Title"}]
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

                        it('should have set the output type attribute to fr', function () {
                            for (var i = 0; xmlResult.quiz.question.length > i; i++)
                                expect(xmlResult.quiz.question[i].$.type).to.equal('shortanswer');
                        });

                    });

                    describe('xml question title', function () {
                        it('should be Problem Title', function () {
                            expect(xmlResult.quiz.question[0].name[0].text[0]).to.equal("Problem Title");
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















