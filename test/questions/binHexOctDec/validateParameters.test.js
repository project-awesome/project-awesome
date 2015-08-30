var expect = require("chai").expect;
var questions = require("../../../questions");
var binHexOctDec = require("../../../questions/binHexOctDec");

describe('questions.binHexOctDec.validateParameters(parameters)', function() {
	var validateParameters;
	before(function() {
		validateParameters = binHexOctDec.validateParameters;
	});
	it('should exist', function() {
		expect(validateParameters).to.be.a('function');
	});
	describe('when parameters are undefined', function() {
		it('should return an empty array', function() {
			expect(validateParameters()).to.eql([]);
		});
	});
	describe('when parameters is an empty object', function() {
		it('should return an empty array', function() {
			expect(validateParameters({})).to.eql([]);
		});
	});
	describe('when parameters is defined but not an object', function() {
		var errors;
		beforeEach(function() {
			errors = validateParameters('string');
		});
		it('should return an array with one element', function() {
			expect(errors.length).to.equal(1);
		});
		describe('error type', function() {
			it('should equal ExpectedObjectError', function() {
				expect(errors[0].type).to.equal('ExpectedObjectError');
			});
		});
		describe('error path', function() {
			it('should be an empty array', function() {
				expect(errors[0].path).to.eql([]);
			});
		});
	});
	describe('spaceBinary', function() {
        describe('valid cases', function() {
            describe('when value is true', function() {
                it('should return true', function() {
                	var errors = validateParameters({ spaceBinary: true });
                    expect(errors).to.eql([]);
                });
            });
            describe('when value is false', function() {
                it('should return true', function() {
                	var errors = validateParameters({ spaceBinary: false });
                    expect(errors).to.eql([]);
                });
            });
        });
        describe('invalid cases', function() {
            describe('when typeof spaceBinary is not boolean', function() {
                it('should give an ExpectedBooleanError for non booleans', function() {
                	var errors = validateParameters({ spaceBinary: 'true' });
                    expect(errors[0].type).to.equal('ExpectedBooleanError');
                    expect(errors[0].path).to.eql(['spaceBinary']);
                });
            });
        });
	});
	describe('conversions', function() {

	});

});





