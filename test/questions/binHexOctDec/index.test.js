var expect = require("chai").expect;
var questions = require("../../questions");
var binHexOctDec = require("../../questions/binHexOctDec");

describe('binHexOctDec', function() {

	describe('questions.questionTypes for binHexOctDec', function() {
		
		it('should be that binHexOctDec is a question type', function() {
			expect(questions.questionTypes.binHexOctDec).to.exist;
			expect(questions.questionTypes.binHexOctDec).to.be.an("object");
	    });
		it('should be that binHexOctDec.f is a function', function() {
			expect(questions.questionTypes.binHexOctDec.f).to.exist;
			expect(questions.questionTypes.binHexOctDec.f).to.be.a("function");
	    });
		it('should be that binHexOctDec.title is a string', function() {
			expect(questions.questionTypes.binHexOctDec.title).to.exist;
			expect(questions.questionTypes.binHexOctDec.title).to.be.a("string");
	    });

		it('should be that binHexOctDec.validateParameters is a function', function() {
			expect(questions.questionTypes.binHexOctDec.validateParameters).to.exist;
			expect(questions.questionTypes.binHexOctDec.validateParameters).to.be.a("function");
	    });
	});

    describe('binHexOctDec.radixDescription', function() {
    	var radixDescription, mock0, mock1;
    	before(function() {
			radixDescription = binHexOctDec.radixDescription;
	        mock0 = {nextIntRange: function(n) { return 0; }};
	        mock1 = {nextIntRange: function(n) { return 1; }};
    	});
    	describe('base 2', function() {
    		describe('when randomStream.nextIntRange returns 0', function() {
    			it('should return "base 2"', function() {
    				expect(radixDescription(2,mock0)).to.equal("base 2");
    			});
    		});
    		describe('when randomStream.nextIntRange returns 1', function() {
    			it('should return "binary"', function() {
    				expect(radixDescription(2,mock1)).to.equal("binary");
    			});
    		});
    	});
    	describe('base 8', function() {
    		describe('when randomStream.nextIntRange returns 0', function() {
    			it('should return "base 8"', function() {
    				expect(radixDescription(8,mock0)).to.equal("base 8");
    			});
    		});
    		describe('when randomStream.nextIntRange returns 1', function() {
    			it('should return "octal"', function() {
    				expect(radixDescription(8,mock1)).to.equal("octal");
    			});
    		});
    	});
    	describe('base 10', function() {
    		describe('when randomStream.nextIntRange returns 0', function() {
    			it('should return "base 10"', function() {
    				expect(radixDescription(10,mock0)).to.equal("base 10");
    			});
    		});
    		describe('when randomStream.nextIntRange returns 1', function() {
    			it('should return "decimal"', function() {
    				expect(radixDescription(10,mock1)).to.equal("decimal");
    			});
    		});
    	});
    	describe('base 16', function() {
    		describe('when randomStream.nextIntRange returns 0', function() {
    			it('should return "base 16"', function() {
    				expect(radixDescription(16,mock0)).to.equal("base 16");
    			});
    		});
    		describe('when randomStream.nextIntRange returns 1', function() {
    			it('should return "hexadecimal"', function() {
    				expect(radixDescription(16,mock1)).to.equal("hexadecimal");
    			});
    		});
    	});
    	describe('base 4', function() {
    		describe('when randomStream.nextIntRange returns 0', function() {
    			it('should return "base 4"', function() {
    				expect(radixDescription(4,mock0)).to.equal("base 4");
    			});
    		});
    		describe('when randomStream.nextIntRange returns 1', function() {
    			it('should return "base 4"', function() {
    				expect(radixDescription(4,mock0)).to.equal("base 4");
    			});
    		});
    	});
    });

});	







