var expect = require("chai").expect;

var questions = require("../../questions");
var changeOfBase = require("../../questions/changeOfBase");

describe('changeOfBase',function() {

	var mockRS = {
	    nextIntRange: function(n) { 
			return retVals.shift();
	    },
	    shuffle: function(array) {
	    	array.reverse();
	    }
	};
	var retVals = [0];

	it('should be that changeOfBase is a question type', function() {
		expect(questions.questionTypes.changeOfBase).to.exist;
		expect(questions.questionTypes.changeOfBase).to.be.an("object");
	});

	it('should be that changeOfBase.f is a function', function() {
		expect(questions.questionTypes.changeOfBase.f).to.exist;
		expect(questions.questionTypes.changeOfBase.f).to.be.a("function");
    });

	it('should be that changeOfBase.title is a string', function() {
		expect(questions.questionTypes.changeOfBase.title).to.exist;
		expect(questions.questionTypes.changeOfBase.title).to.be.a("string");
    });


	it('should be that [0,5,0,0] is Convert 1111 from binary to hexadecimal.', function() {	
		retVals = [0,5,0,0];
		var q = new changeOfBase.changeOfBaseQuestion(mockRS);
		var expected="Convert 1111 from binary to hexadecimal.";
		expect(q.question).to.equal(expected);
		expect(q.answer).to.equal(3);
    });

	it('should be that [3,3,4,5] is Convert 10010 from binary to hexadecimal.', function() {
        retVals = [3,3,4,5];
		var q = new changeOfBase.changeOfBaseQuestion(mockRS);
		var expected="Convert 10010 from binary to hexadecimal.";
		expect(q.question).to.equal(expected);
		expect(q.answer).to.equal(3);
    });


    });	