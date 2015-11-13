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


	
	describe('generate', function() {
		it('should exist', function() {
			pa_test_helper.expectCommandExists(pa,'generate');
		});
		describe('arguments', function() {
			it('should have required "type" and "seed"', function() {
				var generate = pa_test_helper.getCommand(pa,'generate');
				pa_test_helper.expectArguments(generate, [
					{ required: true, name: 'type', variadic: false },
		     		{ required: true, name: 'seed', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var generate = pa_test_helper.getCommand(pa,'generate');
				pa_test_helper.expectDescription(generate, 'Generates given type.');
			});
		});
		describe('action', function() {
			var sandbox, generateStub, stdoutStub, stderrStub, stdinjsonStub, stringifyStub;
			beforeEach(function() {
				sandbox = sinon.sandbox.create();
				stdinjsonStub = sandbox.stub(stdinjson, 'input').returnsPromise();
				generateStub = sandbox.stub(projectAwesome, 'generate');
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
					pa_test_helper.run(pa,'generate', ['a', 'b']);
					expect(stderrStub.calledWith("stdinjsonReject" + "\n")).to.be.true;
				});
			});
			describe('when stdinjson resolves', function() {
				beforeEach(function() {
					stdinjsonStub.resolves("stdinjsonResolve");
				});
				it('should call projectAwesome.generate with the appropriate parameters', function() {
						pa_test_helper.run(pa,'generate', ['a', 'b']);
					expect(generateStub.calledWith('a', 'stdinjsonResolve', 'b')).to.be.true;
				});
				describe('when projectAwesome.generate throws an error', function() {
					beforeEach(function() {
						generateStub.throws("generateThrow");
					});
					it('should write error + newline to stderr', function() {
							pa_test_helper.run(pa,'generate', ['a', 'b']);
						expect(stderrStub.calledWith("generateThrow" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.generate returns JSON object', function() {
					beforeEach(function() {
						generateStub.returns({"generate":"return"});
					});
					it('should stringify then write result + newline to stdout', function() {
						stringifyStub.returns("stringifyReturn");
						pa_test_helper.run(pa,'generate', ['a', 'b']);
						expect(stringifyStub.calledWith({"generate":"return"})).to.be.true;
						expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.generate returns non JSON object', function() {
					beforeEach(function() {
						generateStub.returns("generateStub");
					});
					it('should stringify then write result + newline to stdout', function() {
							pa_test_helper.run(pa,'generate', ['a', 'b']);
						expect(stdoutStub.calledWith("generateStub" + "\n")).to.be.true;
					});
				});
			});
		});
	});
