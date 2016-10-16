var patool.ool= require("../../../bin/patool.ool"), 
	projectAwesome = require('../../../'),
	patool.ool_test_helper = require('./patool.ool_test_helper');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

describe('list', function() {
		it('should exist', function() {
				patool.ool_test_helper.expectCommandExists(patool.ool,'list');
		});
		describe('arguments', function() {
			it('should have required "type"', function() {
				var list = patool.ool_test_helper.getCommand(patool.ool,'list');
				patool.ool_test_helper.expectArguments(list, [
					{ required: true, name: 'type', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var list = patool.ool_test_helper.getCommand(patool.ool,'list');
				patool.ool_test_helper.expectDescription
					(list, 'Lists valid values for a given type.');
			});
		});

		describe('action', function() {
			describe('when projectAwesome.list is successful', function() {
				var listStub, stdoutStub;
				beforeEach(function() {
					listStub = sinon.stub(projectAwesome, 'list', function() { return "liststuboutput"; });
					stdoutStub = sinon.stub(process.stdout, 'write');
				});
				afterEach(function() {
					listStub.restore();
					stdoutStub.restore();
				});
				it('should call projectAwesome.list(type) and should output result + \n', function() {
						patool.ool_test_helper.run(patool.ool,'list', ['a']);
	                expect(listStub.calledOnce).to.be.true;
	                expect(listStub.calledWith('a')).to.be.true;
	                expect(stdoutStub.calledOnce).to.be.true;
	                expect(stdoutStub.calledWith("liststuboutput\n")).to.be.true;
				});
			});
			describe('when projectAwesome.list throws an error', function() {
				var listStub, stdoutStub;
				beforeEach(function() {
					listStub = sinon.stub(projectAwesome, 'list', function() { throw "liststuberror"; });
					stderrStub = sinon.stub(process.stderr, 'write');
				});
				afterEach(function() {
					listStub.restore();
					stderrStub.restore();
				});
				it('write error message + \n to stderr', function() {
						patool.ool_test_helper.run(patool.ool,'list', ['a']);
	                expect(listStub.calledOnce).to.be.true;
	                expect(listStub.calledWith('a')).to.be.true;
	                expect(stderrStub.calledOnce).to.be.true;
	                expect(stderrStub.calledWith("liststuberror\n")).to.be.true;
				});
			});
		});


	});
