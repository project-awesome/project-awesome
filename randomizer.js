// By Abe K. (https://github.com/abe-k)

// randomizer.js
var crypto = require('crypto');

// Randomizer provides seedable pseudo-random number generation
//  internally based on the SHA-256 hash
// It can be passed a (non-empty) string as initial seed, or a random seed will be used.
// Each function for providing randomness takes an initial argument `decis`
//  which must be a string. A call with the same initSeed and decis will return the same result,
//  so to generate a sequence of random numbers, `decis` must be different each time.
module.exports = function Randomizer(seed) {
    var randmax = Math.pow(2, 32)-1;
    var pos = 0;
    
    if (typeof seed !== 'string' || seed === '') {
        throw new TypeError('seed must be a non-empty string');
    }
    
    // this internal class handles extracting random numbers from the
    //  SHA-256 hash and restricting them to a given range
    var RandCore = function (decis) {
        var count = -1;
        var digest;
        var place = 32;
        
        // generate a random unsigned 32-bit integer
        this.nextRaw = function () {
            if (place > 32-4) {
                count += 1;
                digest = crypto.createHash('sha256').update(seed + '|' + pos + '|' + decis + '|' + count).digest();
                place = 0;
            }
            var raw = digest.readUInt32LE(place);
            place += 4;
            return raw;
        }
        
        // generate a random integer in the range [0, x)
        this.next = function(x) {
            var result;
            if (x <= 1) {
                return 0;
            }
            // calculate (lowest power of two >= x) minus one
            var v = x - 1;
            v |= v >> 1;
            v |= v >> 2;
            v |= v >> 4;
            v |= v >> 8;
            v |= v >> 16;
            do {
                result = this.nextRaw() & v;
            } while (result >= x);
            return result;
        }
    }
    
    // Generates a random integer.
    // If y is given, generates an integer in [x, y)
    // Otherwise, generates an integer in [0, x)
    this.integer = function (decis, x, y) {
        var gen = new RandCore(decis);
        var lo, hi;
        if (typeof y === 'undefined') {
            lo = 0; hi = x;
        }
        else if (x < y) {
            lo = x; hi = y;
        } else {
            lo = y; hi = x;
        }
        return gen.next(hi-lo)+lo;
    }
    
    // Generates a real (floating-point) number.
    // Range is [x, y].
    // Note that only 32 bits of entropy are used, so not all double values are possible.
    this.real = function (decis, x, y) {
        var gen = new RandCore(decis);
        var lo, hi;
        if (x < y) {
            lo = x; hi = y;
        } else {
            lo = y; hi = x;
        }
        return gen.nextRaw()/randmax*(hi-lo)+lo;
    }
    
    // Generates a random boolean.
    // If p is passed, generates true with probability p (0 to 1)
    // Otherwise, generates true with probability 0.5
    this.bool = function (decis, p) {
        var gen = new RandCore(decis);
        if (typeof p === 'undefined') {
            return Boolean(gen.nextRaw() & 1);
        }
        return gen.nextRaw() < (p * (randmax + 1));
    }
    
    // Selects elements of the array a.
    // If n is passed, selects an array of n elements of a (random order).
    // Otherwise, selects a single element of a.
    this.pick = function (decis, a, n) {
        var gen = new RandCore(decis);
        if (typeof n === 'undefined' || n === 1) {
            return a[gen.next(a.length)];
        }
        return this.shuffle(decis, a).slice(0, n);
    }
    
    // Shuffles the array a.
    // Creates a random permutation of a.
    // Does not mutate the orginal array.
    this.shuffle = function(decis, a) {
        var gen = new RandCore(decis);
        var res = new Array(a.length);
        for (var i = 0; i < a.length; i += 1) {
            var x = gen.next(i+1);
            res[i] = res[x];
            res[x] = a[i];
        }
        return res;
    }
    
    // Advance the internal state of the RNG
    //  so that it will return different values for the same decisions.
    this.advance = function() {
        pos += 1;
    }
}