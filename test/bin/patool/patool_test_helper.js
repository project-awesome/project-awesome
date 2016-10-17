
module.exports.run = function (patool, name, args) {
	var argv = [ 'node', 'test'];
	if (name) {
		argv.push(name);
		if (args && args.length > 0)
			argv = argv.concat(args);
	}
	patool.run(argv);
}

module.exports.getCommand = function(patool, name) {
	for (var i = 0; patool.program.commands.length > i; i++)
		if (patool.program.commands[i]._name === name)
			return patool.program.commands[i];
	throw "Command Not Found: " + name + " not found in patool.program.commands";
}

module.exports.expectCommandExists = function(patool, name) {
			module.exports.getCommand(patool, name);
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
