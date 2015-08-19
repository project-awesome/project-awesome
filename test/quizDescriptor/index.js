var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
var expect = chai.expect;


var _und = require("underscore")._;

var quizDescriptor = require("../../quizDescriptor/index");
var isValid = quizDescriptor.isValidQuizDescriptorQuestion;
var isValidJSON = quizDescriptor.isValidQuizDescriptorQuestionJSON;


describe('isValidQDParams', function() {
    describe('changeOfBase', function() {
        it('should return false', function() {
            expect(quizDescriptor.isValidQDParams({}, "changeOfBase")).to.be.false;
        });
    });

    describe('binHexOctDec', function() {
        var questionType;
        before(function() {
            questionType = 'binHexOctDec';
        });


        describe('valid params', function() {
            var params;
            before(function() {
                params = {};
            });
            describe('when params is array of size 1', function() {
                before(function() {
                    params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
            describe('when params is array of size greater than 1', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10 },
                        {'fromRad': 10, 'toRad': 8, 'minVal': 0, 'maxVal': 10 }
                    ];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
            describe('when minVal equals maxVal', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 10, 'minVal': 10, 'maxVal': 10 },
                    ];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
            describe('when fromRad is 2 and toRad is 16', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 16, 'minVal': 1, 'maxVal': 1000 },
                    ];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
            describe('when fromRad is 3 and toRad is 10', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 3, 'toRad': 10, 'minVal': 1, 'maxVal': 1000 },
                    ];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
            describe('when fromRad is 35 and toRad is 36', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 35, 'toRad': 36, 'minVal': 1, 'maxVal': 1000 },
                    ];
                });
                it('should return true', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.true;
                });
            });
        });


        describe('when parameters not an object', function() {
            it('should return false', function() {
                expect(quizDescriptor.isValidQDParams('', questionType)).to.be.false;
            });
        });
        describe('when parameters.conversions is undefined', function() {
            it('should return false', function() {
                expect(quizDescriptor.isValidQDParams({}, questionType)).to.be.false;
            });
        });
        describe('when parameters.conversions is not an array', function() {
            it('should return false', function() {
                expect(quizDescriptor.isValidQDParams({ conversions: {}}, questionType)).to.be.false;
            });
        });
        describe('when parameters.conversions is an empty array', function() {
            it('should return false', function() {
                expect(quizDescriptor.isValidQDParams({ conversions: []}, questionType)).to.be.false;
            });
        });
        describe('conversion properties', function() {
            var params;
            before(function() {
                params = {};
            });

            describe('fromRad', function() {
                describe('when undefined', function() {
                    before(function() {
                        params.conversions = [{'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when not an integer', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 3.1, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when less than 2', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 1, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when greater than 36', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 37, 'toRad': 2, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
            });

            describe('toRad', function() {
                describe('when undefined', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when not an integer', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 9.1, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when less than 2', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 1, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when greater than 36', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 37, 'minVal': 0, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
            });

            describe('when fromRad is the same as toRad', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 2, 'minVal': 0, 'maxVal': 10 }];
                    });
                it('shoudl return false', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                });
            });

            describe('minVal', function() {
                describe('when undefined', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when not an integer', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 1.1, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when less than 0', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': -1, 'maxVal': 10 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
            });

            describe('maxVal', function() {
                describe('when undefined', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when not an integer', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10.1 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
                describe('when less than 0', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': -1 }];
                    });
                    it('should return false', function() {
                        expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                    });
                });
            });

            describe('when maxVal is not greater than minVal', function() {
                before(function() {
                    params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 10, 'maxVal': 5 }];
                });
                it('should return false', function() {
                    expect(quizDescriptor.isValidQDParams(params, questionType)).to.be.false;
                });
            });
        });
    });
});

describe('isValidQuizDescriptorQuestion', function() {

    describe('params property', function() {
        describe('when undefined', function() {
            var qdQuestion, spy;
            before(function() {
                qdQuestion = {
                    "question": "binHexOctDec",
                    "repeat": 1
                };
                spy = sinon.spy(quizDescriptor, 'isValidQDParams');
            });
            after(function() {
                spy.restore();
            });
            it('should not call isValidQDParams', function() {
                isValid(qdQuestion);
                expect(spy.called).to.be.false;
            });
        });
        describe('when defined', function() {
            var spy, qdQuestion;
            before(function() {
                qdQuestion = {
                    "question": "binHexOctDec",
                    "parameters": {},
                    "repeat": 1
                };
                spy = sinon.spy(quizDescriptor, 'isValidQDParams');
            });
            after(function() {
                spy.restore();
            });
            it('should call isValidQDParams once', function() {
                isValid(qdQuestion);
                expect(spy.calledOnce).to.be.true;
            });
        });
    });

    var validDescriptors = [
        {
            "question": "binHexOctDec",
            "parameters": { conversions: [ {"fromRad": 2, "toRad": 16, "minVal": 0, "maxVal": 10 }] },
            "repeat": 5
        },
        {
            "question": "binHexOctDec",
            "repeat": 5
        }
    ];

    var invalidDescriptors = [
        {},
        { "foo":"bar" },
    ];


    it('should know that a QuizDescriptorQuestions must have a question property', function(){
        var d = _und.clone(validDescriptors[0]);
        delete d.question;
        expect(isValid(d)).to.be.false;
    });

    it('should know that a QuizDescriptorQuestions question must be a string', function(){
        var d = _und.clone(validDescriptors[0]);
        d.question = false;
        expect(isValid(d)).to.be.false;
    });

    it('should know that parameters are an optional property', function(){
        var d = _und.clone(validDescriptors[0]);
        delete d.parameters;
        expect(isValid(d)).to.be.true;
    });


    it('should know that a QuizDescriptorQuestions parameters, if present, must be an object', function(){
        var d = _und.clone(validDescriptors[0]);
        d.parameters = false;
        expect(isValid(d)).to.be.false;
    });

    it('should know that a QuizDescriptorQuestions repeat property must be number', function(){
        var d = _und.clone(validDescriptors[0]);
        d.repeat = false;
        expect(isValid(d)).to.be.false;
    });

    it('should know that a QuizDescriptorQuestions repeat property must be an integer', function(){
        var d = _und.clone(validDescriptors[0]);
        d.repeat = 2.5;
        expect(isValid(d)).to.be.false;
    });

    it('should know that a QuizDescriptorQuestions repeat property must >= 1', function(){
        var d = _und.clone(validDescriptors[0]);
        d.repeat = 0;
        expect(isValid(d)).to.be.false;
    });

    var validDescriptorStrings = validDescriptors.map(function(d) {
        return JSON.stringify(d); 
    });

    var invalidDescriptorStrings = invalidDescriptors.map(function(d) {
        return JSON.stringify(d); 
    });

    var notEvenJSONStrings = ['bar','}{','<>'];


    it('should know that the JSON for valid QuizDescriptorQuestions are valid', function(){
        validDescriptorStrings.forEach( function (s) {
            expect(isValidJSON(s)).to.be.true;
        });
    });

    it('should know that strings that aren\'t even JSON are invalid', function(){
        notEvenJSONStrings.forEach( function (s) {
            expect(isValidJSON(s)).to.be.false;
        });
    });


    it('should know that the JSON for invalid QuizDescriptorQuestions are invalid', function(){
        invalidDescriptorStrings.forEach( function (s) {
            expect(isValidJSON(s)).to.be.false;
        });
    });

});



