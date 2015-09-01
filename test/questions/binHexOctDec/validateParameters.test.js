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
                it('should return an empty array', function() {
                	var errors = validateParameters({ spaceBinary: true });
                    expect(errors).to.eql([]);
                });
            });
            describe('when value is false', function() {
                it('should return an empty array', function() {
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
		var params = {};
        describe('valid conversions values', function() {
            describe('when params is array of size 1', function() {
                before(function() {
                    params.conversions = [ { radix: {from: 2, to: 10}, range:{min: 0, max: 10} } ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when params is array of size greater than 1', function() {
                before(function() {
                    params.conversions = [
                        { radix: {from: 2, to: 10}, range:{min: 0, max: 10} },
                        { radix: {from: 10, to: 8}, range:{min: 0, max: 10} }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when minVal equals maxVal', function() {
                before(function() {
                    params.conversions = [
                        { radix: {from: 2, to: 10}, range:{min: 0, max: 10} }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 2 and toRad is 16', function() {
                before(function() {
                    params.conversions = [
                        { radix: {from: 2, to: 16}, range:{min: 1, max: 1000} }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 3 and toRad is 10', function() {
                before(function() {
                    params.conversions = [
                        { radix: {from: 3, to: 10}, range:{min: 1, max: 1000} }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 35 and toRad is 36', function() {
                before(function() {
                    params.conversions = [
                        { radix: {from: 35, to: 36}, range:{min: 1, max: 1000} }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when conversions is an empty array', function() {
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
        });

        describe('invalid conversions values', function() {
            describe('when conversions is not an array', function() {
                it('should return false', function() {
                    var errors = validateParameters({ conversions: {}});
		            expect(errors.length).to.equal(1);
	                expect(errors[0].type).to.equal('ExpectedArrayError');
	                expect(errors[0].path).to.eql(['conversions']);
                });
            });
            describe('conversion properties', function() {
                var params = {};

                describe('radix', function() {
                    describe('from', function() {
                        describe('when undefined', function() {
                            before(function() {
                                params.conversions = [ { radix: {to: 10}, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a RequiredError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('RequiredError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'from']);
                            });
                        });
                        describe('when not an integer', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 3.1, to: 10}, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a ExpectedIntegerError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('ExpectedIntegerError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'from']);
                            });
                        });
                        describe('when less than 2', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 1, to: 10}, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a MinimumValueError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('MinimumValueError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'from']);
                            });
                        });
                        describe('when greater than 36', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 37, to: 10}, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a MaximumValueError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('MaximumValueError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'from']);
                            });
                        });
                    });

                    describe('to', function() {
                        describe('when undefined', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2}, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a RequiredError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('RequiredError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'to']);
                            });
                        });
                        describe('when not an integer', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 9.1 }, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a ExpectedIntegerError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('ExpectedIntegerError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'to']);
                            });
                        });
                        describe('when less than 2', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 1 }, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a MinimumValueError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('MinimumValueError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'to']);
                            });
                        });
                        describe('when greater than 36', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 37 }, range:{min: 0, max: 10} } ];
                            });
                            it('should contain a MaximumValueError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('MaximumValueError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'radix', 'to']);
                            });
                        });
                    });

                    describe('when radix.from is the same as radix.to', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 2 }, range:{min: 0, max: 10} } ];
                            });
                        it('should contain a ToFromEqualError', function() {
                            var errors = validateParameters(params);
                            expect(errors.length).to.equal(1);
                            expect(errors[0].type).to.equal('ToFromEqualError');
                            expect(errors[0].path).to.eql(['conversions', 0, 'radix']);
                        });
                    });
                });
                
                describe('range', function() {
                    describe('min', function() {
                        describe('when undefined', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{max: 10} } ];
                            });
                            it('should contain a RequiredError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('RequiredError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range', 'min']);
                            });
                        });
                        describe('when not an integer', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: 1.1, max: 10} } ];
                            });
                            it('should contain a ExpectedIntegerError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('ExpectedIntegerError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range', 'min']);
                            });
                        });
                        describe('when less than 0', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: -1, max: 10} } ];
                            });
                            it('should contain a MinimumValueError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('MinimumValueError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range', 'min']);
                            });
                        });
                    });

                    describe('max', function() {
                        describe('when undefined', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: 0 } } ];
                            });
                            it('should contain a RequiredError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('RequiredError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range', 'max']);
                            });
                        });
                        describe('when not an integer', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: 0, max: 10.1 } } ];
                            });
                            it('should contain a ExpectedIntegerError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                                expect(errors[0].type).to.equal('ExpectedIntegerError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range', 'max']);
                            });
                        });
                        describe('when less than 0', function() {
                            before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: 0, max: -1 } } ];
                            });
                            it('should contain a MinimumValueError and an InvalidIntervalError', function() {
                                var errors = validateParameters(params);
                                expect(errors.length).to.equal(2);
                                expect(errors[0].type).to.equal('InvalidIntervalError');
                                expect(errors[0].path).to.eql(['conversions', 0, 'range']);
                                expect(errors[1].type).to.equal('MinimumValueError');
                                expect(errors[1].path).to.eql(['conversions', 0, 'range', 'max']);
                            });
                        });
                    });

                    describe('when range.max is less than range.min', function() {
                        before(function() {
                                params.conversions = [ { radix: {from: 2, to: 10 }, range:{ min: 10, max: 5 } } ];
                        });
                        it('should contain a InvalidIntervalError', function() {
                            var errors = validateParameters(params);
                                expect(errors.length).to.equal(1);
                            expect(errors[0].type).to.equal('InvalidIntervalError');
                            expect(errors[0].path).to.eql(['conversions', 0, 'range']);
                        });
                    });
                });

            });
        });
	});

});





