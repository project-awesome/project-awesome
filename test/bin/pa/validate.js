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


	describe('validate', function() {
		it('should exist', function() {
			pa_test_helper.expectCommandExists(pa,'validate');
		});
		describe('arguments', function() {
			it('should have required "type"', function() {
				var validate = pa_test_helper.getCommand(pa,'validate');
				pa_test_helper.expectArguments(validate, [
					{ required: true, name: 'type', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var validate = pa_test_helper.getCommand(pa,'validate');
				pa_test_helper.expectDescription(validate, 'Gives validation errors.');
			});
		});
		describe('action', function() {

			var sandbox, generateStub, stdoutStub, stderrStub, stdinjsonStub, stringifyStub;
			beforeEach(function() {
				sandbox = sinon.sandbox.create();
				stdinjsonStub = sandbox.stub(stdinjson, 'input').returnsPromise();
				validateStub = sandbox.stub(projectAwesome, 'validate');
				stdoutStub = sandbox.stub(process.stdout, 'write');
				stderrStub = sandbox.stub(process.stderr, 'write');
				stringifyStub = sandbox.stub(JSON, 'stringify');
			});
			afterEach(function() {
				sandbox.restore();
			});

			describe('when stdinjson rejects', function() {
				it('should write the error + newline to stderr', function() {
					stdinjsonStub.rejects("stdinjsonReject");
					pa_test_helper.run(pa,'validate', ['a']);
					expect(stderrStub.calledWith("stdinjsonReject" + "\n")).to.be.true;
				});
			});
			describe('when stdinjson resolves', function() {
				beforeEach(function() {
					stdinjsonStub.resolves("stdinjsonResolve");
				});
				it('should call projectAwesome.validate with the appropriate parameters', function() {
					pa_test_helper.run(pa,'validate', ['a']);
					expect(validateStub.calledWith('a', 'stdinjsonResolve')).to.be.true;
				});
				describe('when projectAwesome.validate throws an error', function() {
					beforeEach(function() {
						validateStub.throws("validateThrow");
					});
					it('should write error + newline to stderr', function() {
						pa_test_helper.run(pa,'validate', ['a']);
						expect(stderrStub.calledWith("validateThrow" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.validate is successful', function() {
					beforeEach(function() {
						validateStub.returns("validateReturn");
						stringifyStub.returns("stringifyReturn");
					});
					it('should stringify then write result + newline to stdout', function() {
						pa_test_helper.run(pa,'validate', ['a']);
						expect(stringifyStub.calledWith("validateReturn")).to.be.true;
						expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
					});
				});
			});
		});
	});
