var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	pa = require("../../bin/pa"), 
	projectAwesome = require('../../'),
	Promise = require('bluebird'),
	stdinjson = require('../../bin/stdinjson');

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


describe('version', function() {
	it('should be "0.0.1"', function() {
		expect(pa.program._version).to.equal("0.0.1");
	});
});

describe('when no command provided', function() {
	var outputHelpStub;
	beforeEach(function() {
		outputHelpStub = sinon.stub(pa.program, 'outputHelp');
	});
	afterEach(function() {
		outputHelpStub.restore();
	});
	it('should default to --help', function() {
		run();
		expect(outputHelpStub.calledOnce).to.be.true;
	});
});

describe('commands', function() {
	describe('check', function() {
		it('should exist', function() {
			expectCommandExists('check');
		});
		describe('arguments', function() {
			it('should have required "type" and "value"', function() {
				var check = getCommand('check');
				expectArguments(check, [
					{ required: true, name: 'type', variadic: false },
		     		{ required: true, name: 'value', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var check = getCommand('check');
				expectDecription(check, 'Checks if value is valid.');
			});
		});
		describe('custom help', function() {
			it('should display examples', function() {
				run('check', ['a', 'b']);
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
					run('check', ['a', 'b']);
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
					run('check', ['a', 'b']);
	                expect(checkStub.calledOnce).to.be.true;
	                expect(checkStub.calledWith('a', 'b')).to.be.true;
	                expect(stderrStub.calledOnce).to.be.true;
	                expect(stderrStub.calledWith("checkstuberror\n")).to.be.true;
				});
			});
		});
	});
	
	describe('check', function() {
		it('should exist', function() {
			expectCommandExists('generate');
		});
		describe('arguments', function() {
			it('should have required "type" and "seed"', function() {
				var generate = getCommand('generate');
				expectArguments(generate, [
					{ required: true, name: 'type', variadic: false },
		     		{ required: true, name: 'seed', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var generate = getCommand('generate');
				expectDecription(generate, 'Generates given type.');
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
					run('generate', ['a', 'b']);
					expect(stderrStub.calledWith("stdinjsonReject" + "\n")).to.be.true;
				});
			});
			describe('when stdinjson resolves', function() {
				beforeEach(function() {
					stdinjsonStub.resolves("stdinjsonResolve");
				});
				it('should call projectAwesome.generate with the appropriate parameters', function() {
					run('generate', ['a', 'b']);
					expect(generateStub.calledWith('a', 'stdinjsonResolve', 'b')).to.be.true;
				});
				describe('when projectAwesome.generate throws an error', function() {
					beforeEach(function() {
						generateStub.throws("generateThrow");
					});
					it('should write error + newline to stderr', function() {
						run('generate', ['a', 'b']);
						expect(stderrStub.calledWith("generateThrow" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.generate returns JSON object', function() {
					beforeEach(function() {
						generateStub.returns({"generate":"return"});
					});
					it('should stringify then write result + newline to stdout', function() {
						stringifyStub.returns("stringifyReturn");
						run('generate', ['a', 'b']);
						expect(stringifyStub.calledWith({"generate":"return"})).to.be.true;
						expect(stdoutStub.calledWith("stringifyReturn" + "\n")).to.be.true;
					});
				});
				describe('when projectAwesome.generate returns non JSON object', function() {
					beforeEach(function() {
						generateStub.returns("generateStub");
					});
					it('should stringify then write result + newline to stdout', function() {
						run('generate', ['a', 'b']);
						expect(stdoutStub.calledWith("generateStub" + "\n")).to.be.true;
					});
				});
			});
		});
	});

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

});



















