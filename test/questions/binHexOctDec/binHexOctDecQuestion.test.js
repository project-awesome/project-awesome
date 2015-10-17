var expect = require("chai").expect;
var questions = require("../../../questions");
var binHexOctDec = require("../../../questions/binHexOctDec");

describe('binHexOctDecQuestion(randomStream, params)', function() {

	var mockRS, retVals, params;
	before(function() {
		params = {};
		mockRS = {
		    nextIntRange: function(n) { 
				return retVals.shift();
		    }
		};
		retVals = [0];
	});
	describe('default cases', function() {
		describe('when randomStream returns 0, 5, 0, and then 0', function() {
			before(function() {
				retVals = [0,5,0,0];
			});
			it('should be that [0,5,0,0] is Convert 5 from base 10 to base 2', function() {	
				var q = new binHexOctDec.generate(mockRS);
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
				var q = new binHexOctDec.generate(mockRS);
				var expected="Convert 101 from binary to decimal.";
				expect(q.question).to.equal(expected);
				expect(q.answer).to.equal("5");
		    });
		});
	});
	
	describe('params', function() {
		describe('spaceBinary', function() {
			var decimalVal = 1000;
			var binaryString = '1111101000';
			var binaryStringOct = '001 111 101 000';
			var binaryStringHex = '0011 1110 1000';
			var params = {};
			var mockRS;
			before(function() {
				params = {};
				// mockRs doesn't matter here because we restricted the converisons to one case
				mockRS = {
				    nextIntRange: function(n) { 
						return 0;
				    }
				};
			});
			describe('when radix.from is 2', function() {
				describe('when radix.to is 8', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:8 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						});
						it('should format the binary number in the question so that digits are in groups of 3', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryStringOct + ' from base 2 to base 8.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:8 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 8.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:8 }, range:{ min:decimalVal, max:decimalVal } } ]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when toRad is 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:16 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						}); 
						it('should format the binary number in the question so that digits are in groups of 4', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryStringHex + ' from base 2 to base 16.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:16 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 16.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:16 }, range:{ min:decimalVal, max:decimalVal } } ]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when toRad is neither 8 nor 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:10 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						}); 
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 10.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:10 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						}); 
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 10.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:2 , to:10 }, range:{ min:decimalVal, max:decimalVal } } ]};
						}); 
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
			});
			describe('when radix.to is 2', function() {
				describe('when radix.from is 8', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:8 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						});
						it('should format the binary answer so that digits are in groups of 3', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryStringOct);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:8 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() {
							params = { conversions: [ { radix:{ from:8 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when fromRad is 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:16 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						});
						it('should format the binary answer so that digits are in groups of 4', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryStringHex);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:16 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:16 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when radix.from is neither 8 nor 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:10 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = true; 
						}); 
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:10 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
							params.spaceBinary = false; 
						}); 
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [ { radix:{ from:10 , to:2 }, range:{ min:decimalVal, max:decimalVal } } ]};
						}); 
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.generate(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.generate(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
			});
		});
		describe('conversions', function() {
			describe("when conversions is an empty array", function() {
				before(function() {
					params = { conversions: []}
					retVals = [0, 0, 0, 0, 0, 0, 0];
				});
				it('should still work and use the default conversions', function() {
					var q = new binHexOctDec.generate(mockRS, params);
					expect(q.question).to.equal('Convert 0 from base 10 to base 2.');
					expect(q.answer).to.equal("0");
				});
			});
			describe("when conversion is { radix: { from: 2, to: 10}, range: {min: 5, max: 5} }", function() {
				before(function() {
					params = { conversions: [ { radix:{ from:2 , to:10 }, range:{ min:5, max:5 } } ]};
					retVals = [0, 0, 0, 0];
				});
				it('should include "from base 2 to base 10" in the question, and the answer should equal 5', function() {
					var q = new binHexOctDec.generate(mockRS, params);
					expect(q.question).to.include('from base 2 to base 10');
					expect(q.answer).to.equal("5");
				});
			});
			describe("when conversion is { radix: {from: 5, to: 7}, range: {min: 1000, max: 1000} }", function() {
				before(function() {
					params = { conversions: [ { radix:{ from:5 , to:7 }, range:{ min:1000, max:1000 } } ]};
					retVals = [0, 0, 1, 1];
				});
				it('should include "from base 5 to base 7" in the question, and the answer should equal 1000', function() {
					var q = new binHexOctDec.generate(mockRS, params);
					expect(q.question).to.include('base 5 to base 7');
					expect(q.answer).to.equal("2626");
				});
			});
		});

	});
});


