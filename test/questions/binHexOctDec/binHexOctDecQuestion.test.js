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
			describe('when fromRad is 2', function() {
				describe('when toRad is 8', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 8, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						});
						it('should format the binary number in the question so that digits are in groups of 3', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryStringOct + ' from base 2 to base 8.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 8, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 8.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 8, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when toRad is 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 16, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						}); 
						it('should format the binary number in the question so that digits are in groups of 4', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryStringHex + ' from base 2 to base 16.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 16, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 16.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 16, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when toRad is neither 8 nor 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 10, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						}); 
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 10.');
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 10, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						}); 
						it('should not add spaces to the binary number', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.question).to.equal('Convert ' + binaryString + ' from base 2 to base 10.');
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 2, 'toRad': 10, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						}); 
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
			});
			describe('when toRad is 2', function() {
				describe('when fromRad is 8', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 8, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						});
						it('should format the binary answer so that digits are in groups of 3', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryStringOct);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 8, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() {
							params = { conversions: [{'fromRad': 8, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when fromRad is 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 16, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						});
						it('should format the binary answer so that digits are in groups of 4', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryStringHex);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 16, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						});
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 16, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						});
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q).to.eql(qSpaceBinary);
						});
					});
				});
				describe('when fromRad is neither 8 nor 16', function() {
					describe('when spaceBinary is true', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 10, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = true; 
						}); 
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is false', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 10, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
							params.spaceBinary = false; 
						}); 
						it('should not add spaces to the binary answer', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							expect(q.answer).to.equal(binaryString);
						});
					});
					describe('when spaceBinary is undefined', function() {
						before(function() { 
							params = { conversions: [{'fromRad': 10, 'toRad': 2, 'minVal': decimalVal, 'maxVal': decimalVal }]};
						}); 
						it('should format as though spaceBinary == true', function() {
							var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
							params.spaceBinary = true;
							var qSpaceBinary = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
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
					var q = new binHexOctDec.binHexOctDecQuestion(mockRS, params);
					expect(q.question).to.equal('Convert 0 from base 10 to base 2.');
					expect(q.answer).to.equal("0");
				});
			});
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

	});
});


