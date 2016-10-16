var patool.ool = require("../../../bin/patool.ool"), 
	projectAwesome = require('../../../'),
	patool.ool_test_helper = require('./patool.ool_test_helper');

var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;


describe('check', function() {
		it('should exist', function() {
				patool.ool_test_helper.expectCommandExists(patool.ool,'check');
		});
		describe('arguments', function() {
			it('should have required "type" and "value"', function() {
					var check = patool.ool_test_helper.getCommand(patool.ool,'check');
				patool.ool_test_helper.expectArguments(check, [
					{ required: true, name: 'type', variadic: false },
		     		{ required: true, name: 'value', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
					var check = patool.ool_test_helper.getCommand(patool.ool,'check');
				patool.ool_test_helper.expectDescription(check, 'Checks if value is valid.');
			});
		});
		describe('custom help', function() {
			it('should display examples', function() {
					patool.ool_test_helper.run(patool.ool,'check', ['a', 'b']);
			});
		});
		describe('action', function() {
			describe('when projectAwesome.check is successful', function() {
				var checkStub, stdoutStub;
				beforeEach(function() {
					checkStub = sinon.stub(projectAwesome, 'check', function() { return "checkstuboutput"; });
					stdoutStub = sinon.stub(process.stdout, 'write');
				});
				afterEach(function() {
					checkStub.restore();
					stdoutStub.restore();
				});
				it('should call projectAwesome.check(type, value) and should output result + \n', function() {
						patool.ool_test_helper.run(patool.ool,'check', ['a', 'b']);
	                expect(checkStub.calledOnce).to.be.true;
	                expect(checkStub.calledWith('a', 'b')).to.be.true;
	                expect(stdoutStub.calledOnce).to.be.true;
	                expect(stdoutStub.calledWith("checkstuboutput\n")).to.be.true;
				});
			});
			describe('when projectAwesome.check throws an error', function() {
				var checkStub, stdoutStub;
				beforeEach(function() {
					checkStub = sinon.stub(projectAwesome, 'check', function() { throw "checkstuberror"; });
					stderrStub = sinon.stub(process.stderr, 'write');
				});
				afterEach(function() {
					checkStub.restore();
					stderrStub.restore();
				});
				it('write error message + \n to stderr', function() {
						patool.ool_test_helper.run(patool.ool,'check', ['a', 'b']);
	                expect(checkStub.calledOnce).to.be.true;
	                expect(checkStub.calledWith('a', 'b')).to.be.true;
	                expect(stderrStub.calledOnce).to.be.true;
	                expect(stderrStub.calledWith("checkstuberror\n")).to.be.true;
				});
			});
		});
	});
