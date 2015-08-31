var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);
var expect = chai.expect;


var _und = require("underscore")._;

var questions = require('../../questions');
var quizDescriptor = require("../../quizDescriptor/index");
var isValid = quizDescriptor.isValidQuizDescriptorQuestion;
var isValidJSON = quizDescriptor.isValidQuizDescriptorQuestionJSON;

describe('isValidQuizDescriptorQuestion', function() {

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



