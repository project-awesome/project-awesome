var expect = require("chai").expect;
var HTMLExporter = require('../../HTMLExporter');
var fs = require('fs');

describe('HTMLExporter', function() {
    var seed = 'abcd1234';
    var qd = {
        "version" : "0.1",
        "quizElements": [{ 
             "repeat": 2,
             "items" : [{
                "problemType": "change-of-base"
              }]
        },
        {
            "repeat": 3,
            "items" : [{
                "problemType": "change-of-base",
                "params": {"outputType": "mc"}
            }]
        }]
    };
    var badQd = {
        "version" : "0.1",
        "quizElements": [{
            "problemType": "nonExistantProblemType",
        }]
    };
    describe('generateHTML(question descriptor, seed)', function () {

        describe('when problemType dne', function () {

                it('should throw an error.', function () {
                    expect(function () { HTMLExporter.generateHTML(badQd, seed) })
					.to.throw('Invalid Question Type: nonExistantProblemType is not a defined problem type.');
                });

            });
        describe('when seed is invalid', function () {

                it('should throw an error.', function () {
                    expect(function () { HTMLExporter.generateHTML(qd, 'bad seed') })
					.to.throw(Error);
                });

            });
/*        
  For now, while we are in flux about so much of the HTML format, don't
  include this type of test which would need constant updating.

         it('should generate quizzes in HTML', function(){
           var expected = 'test/HTMLExporter/quizResult.html';
           var result = HTMLExporter.generateHTML(qd, seed);
            expect(result.trim()).to.equal(fs.readFileSync(expected, 'utf-8').trim());
        });
*/
        
    })
        
});
