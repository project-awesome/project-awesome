var expect = require("chai").expect;
var HTMLExporter = require('../../HTMLExporter');
var expected = 'quizResult.html';
var validator = require('html-validator');
var fs = require('fs');

describe('HTMLExporter', function() {
    var seed = 'abcd1234';
    var qd = {
        "version" : "0.1",
        "questions": [{
            "question": "fr-change-of-base",
            "repeat": 2
        },
        {
            "question": "mc-change-of-base",
            "repeat": 3
        }]
    };
    var badQd = {
        "version" : "0.1",
        "questions": [{
            "question": "invalid question type",
            "repeat": 2
        }]
    };
    describe('generateHTML(question descriptor, seed)', function () {

        describe('when questionType dne', function () {

                it('should throw an error.', function () {
                    expect(function () { HTMLExporter.generateHTML(badQd, seed) })
					.to.throw(Error);
                });

            });
        describe('when seed is invalid', function () {

                it('should throw an error.', function () {
                    expect(function () { HTMLExporter.generateHTML(qd, 'bad seed') })
					.to.throw(Error);
                });

            });
        it('should generate quizzes in HTML', function(){
           var result = HTMLExporter.generateHTML(qd, seed);
           expect(result).to.equal(fs.readFileSync(expected, 'utf8'));

        });
        
    })
        
});