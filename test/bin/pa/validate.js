var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	pa = require("../../../bin/pa"), 
	projectAwesome = require('../../../'),
	Promise = require('bluebird'),
	stdinjson = require('../../../bin/stdinjson');

var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

chai.should();
chai.use(sinonChai);
var expect = chai.expect;

function run(name, args) {
	var argv = [ 'node', 'test'];
	if (name) {
		argv.push(name);
		if (args && args.length > 0)
			argv = argv.concat(args);
	}
	pa.run(argv);
}

function getCommand(name) {
	for (var i = 0; pa.program.commands.length > i; i++)
		if (pa.program.commands[i]._name === name)
			return pa.program.commands[i];
	throw "Command Not Found: " + name + " not found in pa.program.commands";
}

function expectCommandExists(name) {
	getCommand(name);
}

function expectArguments(command, args) {
	var err = "Expected Equal Arguments";
	if (args.length != command._args.length) throw err;
	for (var i = 0; command._args > i; i++)
		expect(command._args[i]).to.equal(args[i]);
}

function expectDecription(command, description) {
	if (command._description !== description)
		throw "Expected Description. expected: " + description + "  got: " + command._description; 
}



	describe('validate', function() {
		it('should exist', function() {
			expectCommandExists('validate');
		});
		describe('arguments', function() {
			it('should have required "type"', function() {
				var validate = getCommand('validate');
				expectArguments(validate, [
					{ required: true, name: 'type', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var validate = getCommand('validate');
				expectDecription(validate, 'Gives validation errors.');
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
					run('validate', ['a']);
					expect(stderrStub.calledWith("stdinjsonReject" + "\n")).to.be.true;
				});
			});
			describe('when stdinjson resolves', function() {
				beforeEach(function() {
					stdinjsonStub.resolves("stdinjsonResolve");
				});
				it('should call projectAwesome.validate with the appropriate parameters', function() {
					run('validate', ['a']);
					expect(validateStub.calledWith('a', 'stdinjsonResolve')).to.be.true;
				});
				describe('when projectAwesome.validate throws an error', function() {
					beforeEach(function() {
						validateStub.throws("validateThrow");
					});
					it('should write error + newline to stderr', function() {
						run('validate', ['a']);
						expect(stderrStub.calledWith("validateThrow" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.validate is successful', function() {
					beforeEach(function() {
						validateStub.returns("validateReturn");
						stringifyStub.returns("stringifyReturn");
					});
					it('should stringify then write result + newline to stdout', function() {
						run('validate', ['a']);
						expect(stringifyStub.calledWith("validateReturn")).to.be.true;
						expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
					});
				});
			});
		});
	});
