var expect = require("chai").expect;
var stdinjson = require('../../bin/stdinjson');

describe("stdinjson", function() {
  var stdin;
  var valid_qd = {
      "version" : "0.1",
      "questions": [{
        "question": "binHexOctDec",
        "repeat": 1
    }]
  };
  beforeEach(function () {
    stdin = require('mock-stdin').stdin();
  });
  it('provides some JSON from stdin', function () {
    process.nextTick(function mockResponse() {
      stdin.send(JSON.stringify(valid_qd));
      stdin.end();
    });
    return stdinjson.input()
      .then(function (response) {
        expect(response).to.eql(valid_qd);
      });
  });
});










