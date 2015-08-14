module.exports = {};

module.exports.random = function(seed) {

var bits = require('../bits/index');

/*

random.js

Original author, Phill Conrad and Emilie Barnard
UCSB CS Dept. for Project Awesome

Original Version: Spring 2013
Provide a stream of random numbers that is seeded and repeatable,
with a contract similar to that of the Random object in Java SE 7

*/


//Random creates a new random number generator using a single LongBitString seed. The seed is the initial value of the internal state of the pseudorandom number generator which is maintained by method next(int).

        
    //Sets the seed of this random number generator using a single long seed. 
    //The general contract of setSeed is that it alters the state of this random number generator object so as to be in exactly the same state as if it had just been created with the argument seed as a seed. 
    //The method setSeed is implemented by class Random by atomically updating the seed.
    this.setSeed = function(seed) {
        var splitSeed = bits.splitBits(seed);
        this.currentSeed = (splitSeed.bitwiseXOr(bits.splitBits(0x5DEECE66D))).bitwiseAnd(bits.splitBits(0xffffffffffff));
    };

    this.setSeed(seed); // constructor calls setSeed to initialize all attributes
    
/* The general contract of next is that it returns an int value and if the argument bits is between 1 and 32 (inclusive), 
   then that many low-order bits of the returned value will be (approximately) independently chosen bit values, each of which is (approximately) equally likely to be 0 or 1. 
   The method next is implemented by class Random by atomically updating the seed. */

    //This is a linear congruential pseudorandom number generator, as defined by D. H. Lehmer and described by Donald E. Knuth in The Art of Computer Programming, Volume 3: Seminumerical Algorithms, section 3.2.1. 
    this.next = function(theBits) {
        this.currentSeed = this.currentSeed.times(bits.splitBits(0x5DEECE66D));
        this.currentSeed = this.currentSeed.plus(bits.splitBits(0xB));
        this.currentSeed = this.currentSeed.bitwiseAnd(bits.splitBits(0xffffffffffff));
        if ((48-theBits)<32)
             return this.currentSeed.rightShift(48-theBits);
        else
             return null; //this shouldn't happen
    };
    
    //Returns the next pseudorandom, uniformly distributed int value from this random number generator's sequence. 
    //The general contract of nextInt is that one int value is pseudorandomly generated and returned. All 2^32 possible int values are produced with (approximately) equal probability.
    this.nextInt = function () { 
         return this.next(32).combineBits(); //essentially just calls next with 32 bits
    };
    
    //Returns a pseudorandom, uniformly distributed int value between 0 (inclusive) and the specified value (exclusive), drawn from this random number generator's sequence. 
    //The general contract of nextInt is that one int value in the specified range is pseudorandomly generated and returned. All n possible int values are produced with (approximately) equal probability.
    this.nextIntRange = function (n)  {
        if (n <= 0)
            return null;
	
        var logBase2 = Math.log(n) / Math.log(2);
        if (Math.floor(logBase2) == logBase2)
            return ((bits.splitBits(n).times(this.next(31))).rightShift(31).combineBits());
        
        var theBits, val;
        do {
            theBits = this.next(31).combineBits();
            val = theBits % n;
        } while (theBits - val + (n-1) < 0);
        return val;
    };

    //Picks a random element from an array of n elements, with each element having probability of being chosen 1/n
    this.pick = function (someArray) {
        if (!someArray.length)
            return null;
        return someArray[this.nextIntRange(someArray.length)];
    }
    
    //Shuffles an array in place, with each possible permutation having equal probability 1/n!
    //This is a Fisher-Yates shuffle (also called a Knuth shuffle), described in The Art of Computer Programming 2, pp. 124-125:
    //From i=n-1 downto 1: choose j from 0 to i inclusive, and swap a[i] with a[j].
    this.shuffle = function (someArray) {
	    for(var i=someArray.length - 1; i>=1; i--) {
	        var j = this.nextIntRange(i+1); // nextIntRange's param is "exclusive", so we add one
	        var temp=someArray[i];
	        someArray[i]=someArray[j];
	        someArray[j]=temp;
	    }
    };
    
};

module.exports.randIntBetweenInclusive = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};



module.exports.determineSeed = function(rawTextSeed) {

    // return seed as a hex number converted from rawTextSeed,
    // or if that is not possible, return a random seed that is a
    // legit positive integer between 0 and 2^32-1.
    
    var seedToReturn = parseInt(rawTextSeed,16);

    // Use the alternative if the seed passed in was not a legit number
    if (isNaN(seedToReturn))
	return module.exports.randIntBetweenInclusive(0,0xFFFFFFFF);

    return seedToReturn;
}

