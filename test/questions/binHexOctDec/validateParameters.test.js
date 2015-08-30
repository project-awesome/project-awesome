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
		var params = {};
        describe('valid conversions values', function() {
            describe('when params is array of size 1', function() {
                before(function() {
                    params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when params is array of size greater than 1', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10 },
                        {'fromRad': 10, 'toRad': 8, 'minVal': 0, 'maxVal': 10 }
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when minVal equals maxVal', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 10, 'minVal': 10, 'maxVal': 10 },
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 2 and toRad is 16', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 2, 'toRad': 16, 'minVal': 1, 'maxVal': 1000 },
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 3 and toRad is 10', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 3, 'toRad': 10, 'minVal': 1, 'maxVal': 1000 },
                    ];
                });
                it('should be valid', function() {
                    expect(validateParameters(params)).to.eql([]);
                });
            });
            describe('when fromRad is 35 and toRad is 36', function() {
                before(function() {
                    params.conversions = [
                        {'fromRad': 35, 'toRad': 36, 'minVal': 1, 'maxVal': 1000 },
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

                describe('fromRad', function() {
                    describe('when undefined', function() {
                        before(function() {
                            params.conversions = [{'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('RequiredError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'fromRad']);
                        });
                    });
                    describe('when not an integer', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 3.1, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('ExpectedIntegerError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'fromRad']);
                        });
                    });
                    describe('when less than 2', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 1, 'toRad': 10, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('MinimumValueError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'fromRad']);
                        });
                    });
                    describe('when greater than 36', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 37, 'toRad': 2, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('MaximumValueError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'fromRad']);
                        });
                    });
                });

                describe('toRad', function() {
                    describe('when undefined', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('RequiredError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'toRad']);
                        });
                    });
                    describe('when not an integer', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 9.1, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('ExpectedIntegerError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'toRad']);
                        });
                    });
                    describe('when less than 2', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 1, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('MinimumValueError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'toRad']);
                        });
                    });
                    describe('when greater than 36', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 37, 'minVal': 0, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('MaximumValueError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'toRad']);
                        });
                    });
                });

                describe('when fromRad is the same as toRad', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 2, 'minVal': 0, 'maxVal': 10 }];
                        });
                    it('shoudl return false', function() {
	                	var errors = validateParameters(params);
		                expect(errors.length).to.equal(1);
	                    expect(errors[0].type).to.equal('ToFromEqualError');
	                    expect(errors[0].path).to.eql(['conversions', 0]);
                    });
                });

                describe('minVal', function() {
                    describe('when undefined', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('RequiredError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'minVal']);
                        });
                    });
                    describe('when not an integer', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 1.1, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('ExpectedIntegerError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'minVal']);
                        });
                    });
                    describe('when less than 0', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': -1, 'maxVal': 10 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('MinimumValueError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'minVal']);
                        });
                    });
                });

                describe('maxVal', function() {
                    describe('when undefined', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('RequiredError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'maxVal']);
                        });
                    });
                    describe('when not an integer', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': 10.1 }];
                        });
                        it('should return false', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
		                    expect(errors[0].type).to.equal('ExpectedIntegerError');
		                    expect(errors[0].path).to.eql(['conversions', 0, 'maxVal']);
                        });
                    });
                    describe('when less than 0', function() {
                        before(function() {
                            params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 0, 'maxVal': -1 }];
                        });
                        it('should contain a MinimumValueError and an InvalidIntervalError', function() {
		                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(2);
		                    expect(errors[0].type).to.equal('InvalidIntervalError');
		                    expect(errors[0].path).to.eql(['conversions', 0]);
		                    expect(errors[1].type).to.equal('MinimumValueError');
		                    expect(errors[1].path).to.eql(['conversions', 0, 'maxVal']);
                        });
                    });
                });

                describe('when maxVal is not greater than minVal', function() {
                    before(function() {
                        params.conversions = [{'fromRad': 2, 'toRad': 10, 'minVal': 10, 'maxVal': 5 }];
                    });
                    it('should return false', function() {
	                	var errors = validateParameters(params);
		                	expect(errors.length).to.equal(1);
	                    expect(errors[0].type).to.equal('InvalidIntervalError');
	                    expect(errors[0].path).to.eql(['conversions', 0]);
                    });
                });
            });
        });
	});

});





