var expect = require("chai").expect;
var cloze = require('../../MoodleExporter/cloze');

// TODO: Need escapeCloze function to escape the special chars that are part of cloze syntax.
//   SHOULD write escapeCloze that puts \ in front of  } # ~ / " or \
//   SHOULD call escapeCloze any time  questionText, answer, or distractor is passed through
// https://docs.moodle.org/23/en/Embedded_Answers_(Cloze)_question_type
// https://moodle.org/mod/forum/discuss.php?d=275299


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
        "questionText": "Convert 2 from decimal to binary.",
        "answer": "10",
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


    var qi_mc2 = {
            "outputType": "mc",
            "problemType": "paq-change-of-base",
            "questionText": "Convert 1000 from base 2 to base 16.",
            "answer": "8",
	    "points": 7,
            "title": "Change of Base",
            "distractors": [
                "22",
                "dc",
                "8",
                "b9"
            ],
            "answerIndex": 2
        }

    
    describe('qi2cloze(questionInstance)', function () {

	it('should return valid cloze for a fr question with no points specified', function() {
	    var expected = "<div>Convert 28 from decimal to binary.</div>{1:SA:=11100}";
	    expect(cloze.qi2cloze(qi_fr1)).to.equal(expected);
	});
	
	it('should return valid cloze for a fr question that does have points specified', function() {
	    var expected = "<div>Convert 2 from decimal to binary.</div>{42:SA:=10}";
	    expect(cloze.qi2cloze(qi_fr2)).to.equal(expected);
	});

	it('should return valid cloze for a mc question with no points specified', function() {
	    var expected = "<div>Convert 1000 from base 2 to base 16.</div>{7:MCV:22~dc~=8~b9}";		
	    expect(cloze.qi2cloze(qi_mc2)).to.equal(expected);
	});
	

	
    });

    
});















