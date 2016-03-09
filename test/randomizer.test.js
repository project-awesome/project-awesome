var expect = require('chai').expect;
var Randomizer = require('../randomizer');

describe('Randomizer', function () {
    describe('constructor', function () {
        it('creates a Randomizer from a seed', function () {
            var r = new Randomizer('example seed');
            expect(r).to.be.an.instanceof(Randomizer);
        });
        it('errors if no seed is given', function () {
            expect(function() { new Randomizer(); }).to.throw(TypeError);
        });
        it('errors if a non-string seed is given', function () {
            expect(function() { new Randomizer(123); }).to.throw(TypeError);
        });
    });
    describe('integer', function () {
        it('gives specific values for seed "abcd1234"', function () {
            var r = new Randomizer('abcd1234');
            expect(r.integer('test1', 10)).to.equal(9);
            expect(r.integer('test2', 10)).to.equal(2);
            expect(r.integer('test3', 10)).to.equal(7);
        });
    });
});
















// By Abe K.
// We have only written tests for the constructor to Randomizer.
// Randomizer has many methods for providing randomness.
// We decided not to test these methods, for the simple reason that they are random.
// It is certainly possible to do simple tests, only checking (for example) that
//  the values returned are in the correct range.
// However, there are many important properties a random-number generator should have,
//  and testing only a few of them would give a false sense of security:
//  it would provide the illusion that the code is properly tested, without actually providing
//  a guarantee that the random-number generator is working properly.
// To do a full set of proper tests is a monumental undertaking:
//  see for example diehard or the TestU01 suite.
// Since there does not seem to be a Javascript implementation of these tests available,
//  interface to an existing C implementation would be difficult,
//  and creating our own implementation is well outside the scope of this project,
//  we have decided that bad tests are worse than no tests, and so
//  we are not testing the functionality of the Randomizer.