var patool.ool = require("../../../bin/patool.ool"), 
	projectAwesome = require('../../../'),
	patool.ool_test_helper = require('./patool.ool_test_helper'),
	fs = require('fs');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

	describe('validate', function() {
		it('should exist', function() {
			patool.ool_test_helper.expectCommandExists(patool.ool,'validate');
		});
		describe('arguments', function() {
			it('should have required "type"', function() {
				var validate = patool.ool_test_helper.getCommand(patool.ool,'validate');
				patool.ool_test_helper.expectArguments(validate, [
					{ required: true, name: 'type', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var validate = patool.ool_test_helper.getCommand(patool.ool,'validate');
				patool.ool_test_helper.expectDescription(validate, 'Gives validation errors.');
			});
		});
		describe('action', function() {
			var sandbox, generateStub, stdoutStub, fstatSyncStub, readSyncStub, stringifyStub;
			beforeEach(function() {
				sandbox = sinon.sandbox.create();
				
				fstatSyncStub = sandbox.stub(fs, 'fstatSync').returns({"size":1});
				readSyncStub = sandbox.stub(fs, 'readSync').returns(['file-contents-double']);
				
				validateStub = sandbox.stub(projectAwesome, 'validate').returns("validateReturn");
				stdoutStub = sandbox.stub(process.stdout, 'write');
				stringifyStub = sandbox.stub(JSON, 'stringify').returns("stringifyReturn");
			});
			afterEach(function() {
				sandbox.restore();
			});

			it('should call projectAwesome.validate with the appropriate patool.ameters', function() {
				patool.ool_test_helper.run(patool.ool,'validate', ['a']);
				expect(validateStub.calledWith('a', 'file-contents-double')).to.be.true;
			});
			it('should stringify then write result + newline to stdout', function() {
				patool.ool_test_helper.run(patool.ool,'validate', ['a']);
				expect(stringifyStub.calledWith("validateReturn")).to.be.true;
				expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
			});
		});
	});