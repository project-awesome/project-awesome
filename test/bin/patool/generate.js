var patool = require("../../../bin/patool"),
    projectAwesome = require('../../../'),
    patool_test_helper = require('./patool_test_helper'),
    fs = require('fs'),
    stdin = require('mock-stdin').stdin();

var chai = require("chai"),
    sinon = require("sinon"),
    expect = chai.expect;


describe('generate', function() {
    it('should exist', function() {
	patool_test_helper.expectCommandExists(patool,'generate');
    });
    describe('arguments', function() {
	it('should have required "type" and "seed"', function() {
	    var generate = patool_test_helper.getCommand(patool,'generate');
	    patool_test_helper.expectArguments(generate, [
		{ required: true, name: 'type', variadic: false },
		{ required: true, name: 'seed', variadic: false }
	    ]);
	});
    });
    describe('description', function() {
	it('should be as defined', function() {
	    var generate = patool_test_helper.getCommand(patool,'generate');
	    patool_test_helper.expectDescription(generate, 'Generates given type.');
	});
    });
    describe('action', function() {

	var sandbox, generateStub, stdoutStub, stderrStub, stringifyStub, fstatSync, readSyncStub;
	beforeEach(function() {
	    sandbox = sinon.sandbox.create();
	    
	    // see: https://www.npmjs.com/package/mock-stdin
	    stdin.send("file-contents-double", "ascii"); 
	    
	    generateStub = sandbox.stub(projectAwesome, 'generate');
	    stdoutStub = sandbox.stub(process.stdout, 'write');
	    stderrStub = sandbox.stub(process.stderr, 'write');
	    stringifyStub = sandbox.stub(JSON, 'stringify');
	});
	afterEach(function() {
	    sandbox.restore();
	    stdin.restore();
	});
	


    });
});
