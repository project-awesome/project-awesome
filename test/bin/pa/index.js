var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	pa = require("../../../bin/pa"), 
	projectAwesome = require('../../../'),
	Promise = require('bluebird'),
	stdinjson = require('../../../bin/stdinjson'),
	pa_test_helper = require('./pa_test_helper');

var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

chai.should();
chai.use(sinonChai);
var expect = chai.expect;

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

