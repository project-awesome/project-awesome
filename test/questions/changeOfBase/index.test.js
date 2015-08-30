var expect = require("chai").expect;
var questions = require("../../questions");
var changeOfBase = require("../../questions/changeOfBase");

describe('changeOfBase',function() {

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

	it('should be that changeOfBase.validateParameters is a function', function() {
		expect(questions.questionTypes.changeOfBase.validateParameters).to.exist;
		expect(questions.questionTypes.changeOfBase.validateParameters).to.be.a("function");
    });

});	





