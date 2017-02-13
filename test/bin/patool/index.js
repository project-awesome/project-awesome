var patool = require("../../../bin/patool"),
    patool_test_helper = require('./patool_test_helper');

var chai = require("chai"),
    sinon = require("sinon"),
    expect = chai.expect;

describe('version', function() {
    it('should be "1.0.0"', function() {
	expect(patool.program._version).to.equal("1.0.0");
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
	patool_test_helper.run(patool);
	expect(outputHelpStub.calledOnce).to.be.true;
	
    });
	 
});	 
