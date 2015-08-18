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

	describe('binHexOctDec.binHexOctDecQuestion(randomStream, params)', function() {
		var mockRS, retVals;
		before(function() {
			mockRS = {
			    nextIntRange: function(n) { 
					return retVals.shift();
			    }
			};
			retVals = [0];
		});
		describe('when params is defined', function() {
			var params;
			describe("when params == {'fromRad': 2, 'toRad': 10, 'minVal': 5, 'maxVal': 5 }", function() {
				before(function() {
					params = { conversions: [{'fromRad': 2, 'toRad': 10, 'minVal': 5, 'maxVal': 5 }]}
					retVals = [0, 0, 0, 0];
				});
				it('should include "from base 2 to base 10" in the question, and the answer should equal 5', function() {
					var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
					expect(q.question).to.include('from base 2 to base 10');
					expect(q.answer).to.equal("5");
				});
			});
			describe("when params == {'fromRad': 5, 'toRad': 7, 'minVal': 1000, 'maxVal': 1000 }", function() {
				before(function() {
					params = { conversions: [{'fromRad': 5, 'toRad': 7, 'minVal': 1000, 'maxVal': 1000 }]}
					retVals = [0, 0, 1, 1];
				});
				it('should include "from base 5 to base 7" in the question, and the answer should equal 1000', function() {
					var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
					expect(q.question).to.include('base 5 to base 7');
					expect(q.answer).to.equal("2626");
				});
			});

		});
		describe('default cases', function() {
			describe('when randomStream returns 0, 5, 0, and then 0', function() {
				before(function() {
					retVals = [0,5,0,0];
				});
				it('should be that [0,5,0,0] is Convert 5 from base 10 to base 2', function() {	
					var q = new binHexOctDec.binHexOctDecQuestion(mockRS);
					var expected="Convert 5 from base 10 to base 2.";
					expect(q.question).to.equal(expected);
					expect(q.answer).to.equal("101");
			    });
			});
			describe('when randomStream returns 1, 5, 1, and then 1', function() {
				before(function() {
		        	retVals = [1,5,1,1];
				});
				it('should be that [1,5,1,1] is Convert 101 from binary to decimal.', function() {	
					var q = new binHexOctDec.binHexOctDecQuestion(mockRS);
					var expected="Convert 101 from binary to decimal.";
					expect(q.question).to.equal(expected);
					expect(q.answer).to.equal("5");
			    });
			});
		});
	});



});	







