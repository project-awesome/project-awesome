var expect = require("chai").expect;

var questions = require("../../../questions");
var changeOfBase = require("../../../questions/changeOfBase");

describe('changeOfBaseQuestion(randomStream, params)',function() {

	var mockRS = {
	    nextIntRange: function(n) { 
			var next = retVals.shift();
			retVals.push(next);
			return next;
	    },
	    shuffle: function(array) {
	    	array.reverse();
	    }
	};
	var retVals = [0];

/*
	it('should be that [0,5,0,0] is Convert 1111 from binary to hexadecimal.', function() {	
		retVals = [0,5,0,0,3,2];
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
*/

});	