var patool.ool = require("../../../bin/patool.ool"),
	projectAwesome = require('../../../'),
	patool.ool_test_helper = require('./patool.ool_test_helper'),
	fs = require('fs');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

	
	describe('generate', function() {
		it('should exist', function() {
			patool.ool_test_helper.expectCommandExists(patool.ool,'generate');
		});
		describe('arguments', function() {
			it('should have required "type" and "seed"', function() {
				var generate = patool.ool_test_helper.getCommand(patool.ool,'generate');
				patool.ool_test_helper.expectArguments(generate, [
					{ required: true, name: 'type', variadic: false },
		     		{ required: true, name: 'seed', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var generate = patool.ool_test_helper.getCommand(patool.ool,'generate');
				patool.ool_test_helper.expectDescription(generate, 'Generates given type.');
			});
		});
		describe('action', function() {
			var sandbox, generateStub, stdoutStub, stderrStub, stringifyStub, fstatSync, readSyncStub;
			beforeEach(function() {
				sandbox = sinon.sandbox.create();
				
				fstatSyncStub = sandbox.stub(fs, 'fstatSync').returns({"size":1});
				readSyncStub = sandbox.stub(fs, 'readSync').returns(['file-contents-double']);
				
				generateStub = sandbox.stub(projectAwesome, 'generate');
				stdoutStub = sandbox.stub(process.stdout, 'write');
				stderrStub = sandbox.stub(process.stderr, 'write');
				stringifyStub = sandbox.stub(JSON, 'stringify');
			});
			afterEach(function() {
				sandbox.restore();
			});

			it('should call projectAwesome.generate with the appropriate patool.ameters', function() {
				patool.ool_test_helper.run(patool.ool,'generate', ['a', 'b']);
				expect(generateStub.calledWith('a', 'file-contents-double', 'b')).to.be.true;
			});
			describe('when projectAwesome.generate throws an error', function() {
				beforeEach(function() {
					generateStub.throws("generateThrow");
				});
				it('should write error + newline to stderr', function() {
					patool.ool_test_helper.run(patool.ool,'generate', ['a', 'b']);
					expect(stderrStub.calledWith("generateThrow" + "\n")).to.be.true;
				});
			});
			describe('when projectAwesome.generate returns JSON object', function() {
				beforeEach(function() {
					generateStub.returns({"generate":"return"});
				});
				it('should stringify then write result + newline to stdout', function() {
					stringifyStub.returns("stringifyReturn");
					patool.ool_test_helper.run(patool.ool,'generate', ['a', 'b']);
					expect(stringifyStub.calledWith({"generate":"return"})).to.be.true;
					expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
				});
			});
			describe('when projectAwesome.generate returns non JSON object', function() {
				beforeEach(function() {
					generateStub.returns("generateStub");
				});
				it('should stringify then write result + newline to stdout', function() {
					patool.ool_test_helper.run(patool.ool,'generate', ['a', 'b']);
					expect(stdoutStub.calledWith("generateStub" + "\n")).to.be.true;
				});
			});
		});
	});
