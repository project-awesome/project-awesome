var expect = require("chai").expect;
var cloze = require('../../MoodleExporter/cloze');

describe('cloze', function () {

    var qi_fr1 = {
        "outputType": "fr",
        "problemType": "paq-change-of-base",
        "questionText": "Convert 28 from decimal to binary.",
        "answer": "11100",
        "title": "Change of Base"
    };

    var qi_fr2 = {
        "outputType": "fr",
        "problemType": "paq-change-of-base",
        "questionText": "Convert 28 from decimal to binary.",
        "answer": "11100",
        "title": "This title will be ignored",
	"points": 42
    };

    var qi_mc1 = {
        "outputType": "mc",
        "problemType": "paq-change-of-base",
        "questionText": "Convert 1100 0011 from binary to hexadecimal.",
        "answer": "c3",
        "title": "Change of Base",
        "distractors": [
            "4a",
            "195",
            "67",
            "303",
            "c3"
        ],
        "answerIndex": 4
    }

    describe('qi2cloze(questionInstance)', function () {
	
	it('should return valid cloze for a fr question with no points specified', function() {
	    var expected = "<div>Convert 28 from decimal to binary.</div>{1:SA:=11100}";
	    expect(cloze.qi2cloze(qi_fr1)).to.equal(expected);
	});

    });

    
});















