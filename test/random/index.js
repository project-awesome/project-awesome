var expect = require("chai").expect;

var random = require("../../random");

describe('#random',function() {

	it('should be that you can create a random object and set its seed', function(){
		var r = new random.random(0xABCD1234);
		expect(r.currentSeed.highBits).to.equal(5);
		expect(r.currentSeed.lowBits).to.equal(0x7521f459);

	    });

     it('should be that you can create a random object and set its seed', function(){
		var r = new random.random(0x0);
		expect(r.currentSeed.highBits).to.equal(5);
		expect(r.currentSeed.lowBits).to.equal(0xDEECE66D);
	    });

     it('should be that you can create a random object and set its seed', function(){
		var r = new random.random(0xABC000000000);
		expect(r.currentSeed.highBits).to.equal(0xABC5);
		expect(r.currentSeed.lowBits).to.equal(0xDEECE66D);
	    });


    });	




// Mocha cheatsheet
/*
describe('test suite', function () {
  beforeEach(function() { 
  	// ...
  });
  afterEach(function() { 
  	// ...
  });

  before(function() { 
  	// ...
  });
  after(function() { 
  	// ...
  });

  it('a basic test', function() { 
  	// ...
  });

  it('a test with a promise', function() {
    return somePromiseObject; });

  it('an asynchronous test', function(next) {
    if (success) { next(); } else { next(error); }
  });

  xit('use "xit" for pending tests', function() { 
  	// ...
  });
});
*/

// Chai cheatsheet
/*
expect(3).to.eql(2);

expect(obj).to.be.a('string');
expect(obj).to.be.null;
expect(obj).to.be.true;
expect(obj).to.be.false;
expect(obj).to.be.undefined;

expect(list).to.include("item");
expect(list).to.have.length(3);
expect(list).to.have.length.gt(0);
*/






