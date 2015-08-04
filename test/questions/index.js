var expect = require("chai").expect;

var questions = require("../../questions/index");

describe('#questions',function() {

  it('should be that questionTypes exists and is an object', function(){
    expect(questions.questionTypes).to.exist;
    expect(questions.questionTypes).to.be.an("object");
  });

});	

require("./binHexOctDec");
require("./changeOfBase");