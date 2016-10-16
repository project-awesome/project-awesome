var program = require('commander');
var projectAwesome = require('../');
var colors = require('colors');
var fs = require('fs');


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
      var size = fs.fstatSync(process.stdin.fd).size;
      var qdString = size > 0 ? fs.readSync(process.stdin.fd, size)[0] : '';
    
      var quiz = projectAwesome.generate(type, qdString, seed);
      if (typeof quiz === 'object')
        quiz = JSON.stringify(quiz, null, '    ');
      process.stdout.write(quiz + "\n");
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
    
    var size = fs.fstatSync(process.stdin.fd).size;
    var qdString = size > 0 ? fs.readSync(process.stdin.fd, size)[0] : '';
    
    var validation = projectAwesome.validate(type, qdString);
    process.stdout.write(JSON.stringify(validation) + "\n");
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



