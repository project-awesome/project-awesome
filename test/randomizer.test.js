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
    describe('real', function () {
        it('gives specific real number values for seed "abcd1234"', function () {
            var r = new Randomizer('abcd1234');
            expect(r.real('test1', 10, 30)).to.equal(20.90757943478124);
            expect(r.real('test2', 0, 0.5)).to.equal(0.1955953969609913);
            expect(r.real('test3', 21,25)).to.equal(23.957532264049522);
        });
    });
    /*
    describe('nextRaw', function () {
        it('returns a random integer', function () {
            var r = new Randomizer('abcd1234');
            expect((typeof r.nextRaw())).to.equal(Number);
            expect((r.nextRaw()) % 1).to.equal(0);
            expect(r.nextRaw()).to.equal(7);
        });
    });
    
    describe('next', function () {
        it('gives a random int between 0 and x', function () {
            var r = new Randomizer('abcd1234');
            expect(r.next(0)).to.equal(0);
            expect(r.next(10)).to.equal(2);
            expect(r.next(2147483647)).to.equal(7);
        });
    });
    */
    describe('bool', function () {
        it('gives a boolean value with probability weighted on p', function () {
            var r = new Randomizer('abcd1234');
            expect(r.bool('test1', 0)).to.equal(false);
            expect(r.bool('test2', 1)).to.equal(true);
            expect(r.bool('test3')).to.equal(true);
        });
    });
    describe('pick', function () {
        it('gives either a random order array of size n, or if n is 1, a single element', function () {
            var r = new Randomizer('abcd1234');
            var arr = [1,2,3,4,5,6,7];
            var test2 = r.pick('test2', arr, 2);
            var result2 = [4,1];
            var test3 = r.pick('test3', arr, 7);
            var result3 = [5,2,6,4,1,7,3];
            expect(r.pick('test1', arr, 1)).to.equal(2);
            for (var it=0; it< 2; it++){
                expect(test2[it]).to.equal(result2[it]);
            }
            for (var it=0; it< 7; it++){
                expect(test3[it]).to.equal(result3[it]);
            }
            
        });
    });
    describe('shuffle', function () {
        it('creates a copy array of input and shuffles the copy"', function () {
            var r = new Randomizer('abcd1234');
            var arr = [1,2,3,4,5,6,7,8];
            var test1arr = r.shuffle('test1', arr);
            var test1result = [4,6,7,1,3,5,8,2];
            var test2arr = r.shuffle('test2', arr);
            var test2result = [4,1,5,8,6,7,2,3];
            var test3arr = r.shuffle('test3', arr);
            var test3result = [5,2,6,4,8,7,3,1];
            var empty= [];
            for (var it=0; it< 8; it++){
                expect(test1arr[it]).to.equal(test1result[it]);
            }
            for (it=0; it< 8; it++){
                expect(test2arr[it]).to.equal(test2result[it]);
            }
            for (it=0; it< 8; it++){
                expect(test3arr[it]).to.equal(test3result[it]);
            }
            expect((r.shuffle('test3', empty)).length).to.equal(0);
        });
    });
    /*
    describe('advance', function () {
        it('gives specific values for seed "abcd1234"', function () {
            var r = new Randomizer('abcd1234');
            r.advance();
            expect(r.pos).to.equal(1);
            for(var i=0; i< 10; i++){
                r.advance();
            }
            expect(r.pos).to.equal(11);
            for(i=0; i< 20; i++){
                r.advance();
            }
            expect(r.pos).to.equal(21);
        });
    });
    */
});

















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
