var expect = require("chai").expect;
var stdinjson = require('../../bin/stdinjson');

describe("stdinjson", function() {
	var stdin;
	beforeEach(function () {
		stdin = require('mock-stdin').stdin();
	});
	describe('when input is valid JSON', function() {
		var validJSON = {
			"something" : "0.1",
			"somethingelse": [
				{ "property1": "some value", "property2": 1 }
			]
		};
		it('resolves with JSON object', function (done) {
			process.nextTick(function mockResponse() {
				stdin.send(JSON.stringify(validJSON));
				stdin.end();
			});
			stdinjson.input()
			.then(function (response) {
				expect(response).to.eql(validJSON);
				done();
			});
		});
	});
	describe('when input is invalid JSON', function() {
		var invalidJSON = '{ here is an invalid JSON string }';
		it('should reject', function (done) {
			process.nextTick(function mockResponse() {
				stdin.send(invalidJSON);
				stdin.end();
			});
			stdinjson.input()
			.then(function (response) {
				// should not get called
				expect(false).to.be.true;
				done();
			})
			.catch(function(e) {
				done();
			});
		});
	});
});





