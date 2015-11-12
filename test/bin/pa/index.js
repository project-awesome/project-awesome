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


});
