var expect = require("chai").expect;

var questions = require("../../questions");
var binHexOctDec = require("../../questions/binHexOctDec");

describe('#binHexOctDec',function() {


	var mockRS = {
	    nextIntRange: function(n) { 
		return retVals.shift();
	    }
	};
	var retVals = [0];

	it('should be that binHexOctDec is a question type', function(){
		expect(questions.questionTypes.binHexOctDec).to.exist;
		expect(questions.questionTypes.binHexOctDec).to.be.an("object");
	    });

	it('should be that binHexOctDec.f is a function', function(){
		expect(questions.questionTypes.binHexOctDec.f).to.exist;
		expect(questions.questionTypes.binHexOctDec.f).to.be.a("function");
	    });

	it('should be that binHexOctDec.title is a string', function(){
		expect(questions.questionTypes.binHexOctDec.title).to.exist;
		expect(questions.questionTypes.binHexOctDec.title).to.be.a("string");
	    });

	it('should be that binHexOctDec.radixDescription works', function(){	
		var radixDescription = binHexOctDec.radixDescription;
                var mock0 = {nextIntRange: function(n) { return 0; }};
                var mock1 = {nextIntRange: function(n) { return 1; }};

		expect(radixDescription(2,mock0)).to.equal("base 2");
		expect(radixDescription(2,mock1)).to.equal("binary");

		expect(radixDescription(8,mock0)).to.equal("base 8");
		expect(radixDescription(8,mock1)).to.equal("octal");

		expect(radixDescription(10,mock0)).to.equal("base 10");
		expect(radixDescription(10,mock1)).to.equal("decimal");

		expect(radixDescription(16,mock0)).to.equal("base 16");
		expect(radixDescription(16,mock1)).to.equal("hexadecimal");

		expect(radixDescription(4,mock0)).to.equal("base 4");
		expect(radixDescription(4,mock1)).to.equal("base 4");

	    });


	it('should be that [0,5,0,0] is Convert 5 from base 10 to base 2', function(){	
		retVals = [0,5,0,0];
		var q = new binHexOctDec.binHexOctDecQuestion(mockRS);
		var expected="Convert 5 from base 10 to base 2.";
		expect(q.question).to.equal(expected);
		expect(q.answer).to.equal("101");
	    });

	it('should be that [1,5,1,1] is Convert 101 from binary to decimal', function(){
                retVals = [1,5,1,1];
		var q = new binHexOctDec.binHexOctDecQuestion(mockRS);
		var expected="Convert 101 from binary to decimal.";
		expect(q.question).to.equal(expected);
		expect(q.answer).to.equal("5");
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






