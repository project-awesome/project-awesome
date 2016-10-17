var program = require('commander');
var projectAwesome = require('../');
var colors = require('colors');
var fs = require('fs');
var concat = require('concat-stream');



program
  .version('0.0.1')


program
  .command('check <type> <value>')
  .description('Checks if value is valid.')
  .action(function(type, value, options) {
    try {
      process.stdout.write(projectAwesome.check(type, value) + "\n");
    } catch (err) {
      process.stderr.write(err + "\n");
    }
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ patool check seed abcd1234');
    console.log('    $ patool check questionType fr-change-of-base');
  });

program
  .command('list <type> ')
  .description('Lists valid values for a given type.')
  .action(function(type, value, options) {
    try {
      process.stdout.write(projectAwesome.list(type) + "\n");
    } catch (err) {
      process.stderr.write(err + "\n");
    }
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ patool list questionType');
  });


program
  .command('generate <type> <seed>')
  .description('Generates given type.')
  .action(function(type, seed, options) {
    try {

	// error handling is still on stream
	process.stdin.on('error',function(err){
	    console.error(err);
	});
	
	
	process.stdin.pipe(concat(function(buf){
	    // buf is a Node Buffer instance which contains the entire data in stream
	    // if your stream sends textual data, use buf.toString() to get entire stream as string
	    // See: http://stackoverflow.com/questions/13410960/how-to-read-an-entire-text-stream-in-node-js
	    var qdString = buf.toString();
	    
	    var quiz = projectAwesome.generate(type, qdString, seed);
	    if (typeof quiz === 'object')
		quiz = JSON.stringify(quiz, null, '    ');
	    process.stdout.write(quiz + "\n");
	    
	}));
	
    } catch(e) {
      process.stderr.write(e + "\n");
    }
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ patool generate json abcd1234 < myQD.json');
    console.log('    $ patool generate moodleXML abcd1234 < myQD.json');
    console.log('    $ patool generate html abcd1234 < myQD.json');
  });

program
  .command('validate <type>')
  .description('Gives validation errors.')
  .action(function(type, options) {


      // error handling is still on stream
      process.stdin.on('error',function(err){
	  console.error(err);
      });

      process.stdin.pipe(concat(function(buf){
	  // buf is a Node Buffer instance which contains the entire data in stream
	  // if your stream sends textual data, use buf.toString() to get entire stream as string
	  // See: http://stackoverflow.com/questions/13410960/how-to-read-an-entire-text-stream-in-node-js
	  var qdString = buf.toString();
	  var validation = projectAwesome.validate(type, qdString);
	  process.stdout.write(JSON.stringify(validation) + "\n");
      }));


  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ patool validate qd < myQD.json');
  });

program
.command('*', undefined, { "noHelp": true })
.action(function(env) {
  console.log(colors.red("Error") + ": %s is not a patool option", env);
  program.outputHelp();
});

module.exports.program = program;

module.exports.run = function(argv) {
  program.parse(argv);
  if (!argv.slice(2).length) {
    program.outputHelp();
  }
}



