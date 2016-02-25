# project-awesome

See [HOW-TO-BUMP-VERSION.md](/HOW-TO-BUMP-VERSION.md) for how to bump the version. 

NPM for Project Awesome core functions

Project Awesome core functions include automatic quiz/exam question generation.

This does NOT contain the User Interface.  

Only:
* validation of JSON quiz descriptor syntax
* generation of questions and answers from a qd and key
* formatting of questions/answers into various formats (TODO: check this.  Does this happen here, or in the other part of the app?)

# How to Run Tests
To run tests, type: 

```
npm install
npm test
```

# How to run command line tool

```
sudo npm install -g
pa
```

Running pa gives a list of the subcommands you can run, e.g. 

```
pa check ...
pa generate ...
etc...
```

You can add -h to the individual commands of the pa command line tool to see 
what the options are.  For example:

```
pa check -h
pa generate -h
etc.

```
