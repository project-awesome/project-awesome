var patool = require("../../../bin/patool"), 
    projectAwesome = require('../../../'),
    patool_test_helper = require('./patool_test_helper'),
    fs = require('fs'),
    stdin = require('mock-stdin').stdin();

var chai = require("chai"),
    sinon = require("sinon"),
    expect = chai.expect;

describe('validate', function() {
    it('should exist', function() {
	patool_test_helper.expectCommandExists(patool,'validate');
    });
    describe('arguments', function() {
	it('should have required "type"', function() {
	    var validate = patool_test_helper.getCommand(patool,'validate');
	    patool_test_helper.expectArguments(validate, [
		{ required: true, name: 'type', variadic: false }
	    ]);
	});
    });
    describe('description', function() {
	it('should be as defined', function() {
	    var validate = patool_test_helper.getCommand(patool,'validate');
	    patool_test_helper.expectDescription(validate, 'Gives validation errors.');
	});
    });
    describe('action', function() {
	var sandbox, generateStub, stdoutStub, fstatSyncStub, readSyncStub, stringifyStub;
	beforeEach(function() {
	    sandbox = sinon.sandbox.create();
	    
	    // see: https://www.npmjs.com/package/mock-stdin
	    stdin.send("file-contents-double", "utf-8");
	    
	    validateStub = sandbox.stub(projectAwesome, 'validate').returns("validateReturn");
	    stdoutStub = sandbox.stub(process.stdout, 'write');
	    stringifyStub = sandbox.stub(JSON, 'stringify').returns("stringifyReturn");
	});
	afterEach(function() {
	    sandbox.restore();
	    stdin.restore();
	});
	

    });
});
