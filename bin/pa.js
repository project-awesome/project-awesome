var program = require('commander');
var projectAwesome = require('../');
var stdinjson = require('./stdinjson');
var colors = require('colors');

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
    console.log('    $ pa check seed abcd1234');
    console.log('    $ pa check questionType binHexOctDec');
  });

program
  .command('generate <type> <seed>')
  .description('Generates given type.')
  .action(function(type, seed, options) {
    stdinjson.input().then(function(qd) {
      var quiz = projectAwesome.generate(type, qd, seed);
      if (typeof quiz === 'object')
        quiz = JSON.stringify(quiz, null, '    ');
      process.stdout.write(quiz + "\n");
    }).catch(function(e) {
      process.stderr.write(e + "\n");
    });
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ pa generate json abcd1234 < myQD.json');
    console.log('    $ pa generate moodleXML abcd1234 < myQD.json');
  });

program
  .command('validate <type>')
  .description('Gives validation errors.')
  .action(function(type, options) {
    stdinjson.input().then(function(qd) {
      var validation = projectAwesome.validate(type, qd);
      process.stdout.write(JSON.stringify(validation) + "\n");
    }).catch(function(e) {
      process.stderr.write(e + "\n");
    });
  })
  .on('--help', function() {
    console.log('  Examples:');
    console.log();
    console.log('    $ pa validate qd < myQD.json');
  });

program
.command('*', undefined, { "noHelp": true })
.action(function(env) {
  console.log(colors.red("Error") + ": %s is not a pa option", env);
  program.outputHelp();
});

module.exports.program = program;

module.exports.run = function(argv) {
  program.parse(argv);
  if (!argv.slice(2).length) {
    program.outputHelp();
  }
}



