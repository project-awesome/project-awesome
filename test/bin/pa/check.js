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
