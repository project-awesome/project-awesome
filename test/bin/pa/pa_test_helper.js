
module.exports.run = function (pa, name, args) {
	var argv = [ 'node', 'test'];
	if (name) {
		argv.push(name);
		if (args && args.length > 0)
			argv = argv.concat(args);
	}
	pa.run(argv);
}

module.exports.getCommand = function(pa, name) {
	for (var i = 0; pa.program.commands.length > i; i++)
		if (pa.program.commands[i]._name === name)
			return pa.program.commands[i];
	throw "Command Not Found: " + name + " not found in pa.program.commands";
}

module.exports.expectCommandExists = function(pa, name) {
			module.exports.getCommand(pa, name);
}

module.exports.expectArguments = function(command, args) {
	var err = "Expected Equal Arguments";
	if (args.length != command._args.length) throw err;
	for (var i = 0; command._args > i; i++)
		expect(command._args[i]).to.equal(args[i]);
}

module.exports.expectDescription = function(command, description) {
	if (command._description !== description)
		throw "Expected Description. expected: " + description + "  got: " + command._description; 
}
