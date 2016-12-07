# project-awesome
 
See [HOW-TO-BUMP-VERSION.md](/HOW-TO-BUMP-VERSION.md) for how to bump the version. 

NPM for Project Awesome core functions

Project Awesome core functions include automatic quiz/exam question generation.

This does NOT contain the User Interface.  

Only:
* validation of JSON quiz descriptor syntax
* generation of questions and answers from a qd and key
* formatting of questions/answers into various formats (TODO: check this.  Does this happen here, or in the other part of the app?)

# How to get started

1. If you don't already have npm, install it. 
    * https://nodejs.org/en/download/
1. Fork this module to your own github.com space.
2. cd into project-awesome, and run the tests (See item below.
3. TODO: What happens after that?

# How to Run Tests
To run tests, type: 

```
npm install
npm test
```

# How to run command line tool

The "quick and dirty" way to get the command line tool to work (no longer recommended) is to do the following thing:

```
sudo npm install -g
patool
```

This works, but the problem is that it installs patool into your path permanently, as a permanent global
part of your system.     


To define `patool` as a alias for running the project-awesome command line tool (defined in
`./bin/index.js` and `./bin/patool.js`), run this bash script:

```
. define_patool_alias.sh
```

Then, you should be able to run `patool` at the command line.  The purpose of the 
command line `patool` is to provide the minimum necessary interface to working with 
project-awesome modules (the individual pieces of software that define new question types.)

See more on how to work with `patool`, see the section "Working with `patool`" below.

For more on how to get command line tools working in node, see:

* <https://docs.npmjs.com/files/package.json#bin>
* <http://stackoverflow.com/questions/20181072/possible-to-include-a-command-line-in-a-node-module-without-global-install>

# Working with `patool`

Running patool gives a list of the subcommands you can run, e.g. 

```
patool check ...
patool generate ...
etc...
```

You can add -h to the individual commands of the patool command line tool to see 
what the options are.  For example:

```
patool check -h
patool generate -h
etc.

```
