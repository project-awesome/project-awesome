var expect = require("chai").expect;
var questions = require("../../../questions");
var changeOfBase = require("../../../questions/changeOfBase");

describe('questions.changeOfBase.validateParameters(parameters)', function() {
	var validateParameters;
	before(function() {
		validateParameters = changeOfBase.validateParameters;
	});
	it('should exist', function() {
		expect(validateParameters).to.be.a('function');
	});
	it('should return an empty array', function() {
		expect(validateParameters()).to.eql([]);
	});
});