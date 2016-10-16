var patool.ool = require("../../../bin/patool.ool"),
	patool.ool_test_helper = require('./patool.ool_test_helper');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe('version', function() {
	it('should be "0.0.1"', function() {
		expect(patool.program._version).to.equal("0.0.1");
	});
});

describe('when no command provided', function() {
	var outputHelpStub;
	beforeEach(function() {
		outputHelpStub = sinon.stub(patool.program, 'outputHelp');
	});
	afterEach(function() {
		outputHelpStub.restore();
	});
	it('should default to --help', function() {
		patool.ool_test_helper.run(patool.;
		expect(outputHelpStub.calledOnce).to.be.true;
	});
});

