var expect = require("chai").expect;

var questions = require("../../questions");
var cppAppropriateVariables = require("../../questions/cppAppropriateVariables");

describe('cppAppropriateVariables',function() {

	var mockRS = {
	    nextIntRange: function(n) { 
			return retVals.shift();
	    },
	    shuffle: function(array) {
	    	array.reverse();
	    }
	};
	var retVals = [0];

	it('should be that cppAppropriateVariables is a question type', function() {
		expect(questions.questionTypes.cppAppropriateVariables).to.exist;
		expect(questions.questionTypes.cppAppropriateVariables).to.be.an("object");
	});

	it('should be that cppAppropriateVariables.f is a function', function() {
		expect(questions.questionTypes.cppAppropriateVariables.f).to.exist;
		expect(questions.questionTypes.cppAppropriateVariables.f).to.be.a("function");
    });

	it('should be that changeOfBase.title is a string', function() {
		expect(questions.questionTypes.cppAppropriateVariables.title).to.exist;
		expect(questions.questionTypes.cppAppropriateVariables.title).to.be.a("string");
    });


	it('should be that [0,5,0,0] is Convert 1111 from binary to hexadecimal.', function() {	
		retVals = [0,5,0,0,0,5,0,0,0,5,0,0];
		var q = new cppAppropriateVariables.cppAppropriateVariablesQuestion(mockRS, {});
    });
});	