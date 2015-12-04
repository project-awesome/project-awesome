var pa = require("../../../bin/pa"),
	pa_test_helper = require('./pa_test_helper');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe('version', function() {
	it('should be "0.0.1"', function() {
		expect(pa.program._version).to.equal("0.0.1");
	});
});

describe('when no command provided', function() {
	var outputHelpStub;
	beforeEach(function() {
		outputHelpStub = sinon.stub(pa.program, 'outputHelp');
	});
	afterEach(function() {
		outputHelpStub.restore();
	});
	it('should default to --help', function() {
		pa_test_helper.run(pa);
		expect(outputHelpStub.calledOnce).to.be.true;
	});
});

