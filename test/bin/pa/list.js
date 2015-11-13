var chai = require("chai"),
	sinon = require("sinon"),
	sinonChai = require("sinon-chai"),
	pa = require("../../../bin/pa"), 
	projectAwesome = require('../../../'),
	Promise = require('bluebird'),
	stdinjson = require('../../../bin/stdinjson'),
	pa_test_helper = require('./pa_test_helper');

var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

chai.should();
chai.use(sinonChai);
var expect = chai.expect;

describe('list', function() {
		it('should exist', function() {
				pa_test_helper.expectCommandExists(pa,'list');
		});
		describe('arguments', function() {
			it('should have required "type"', function() {
				var list = pa_test_helper.getCommand(pa,'list');
				pa_test_helper.expectArguments(list, [
					{ required: true, name: 'type', variadic: false }
		     	]);
			});
		});
		describe('description', function() {
			it('should be as defined', function() {
				var list = pa_test_helper.getCommand(pa,'list');
				pa_test_helper.expectDescription
					(list, 'Lists valid values for a given type.');
			});
		});

	});
