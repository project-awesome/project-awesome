var expect = require("chai").expect;
var questions = require("../../problemTypes/index");

describe('questions', function () {

    it('should be that problemTypes exists and is an object', function () {
        expect(questions.problemTypes).to.exist;
        expect(questions.problemTypes).to.be.an("object");
    });

    describe('isValidProblemType(problemType)', function () {

        it('should return true when the problem type is a property in problemTypes', function () {
            expect(questions.isValidProblemType('fr-change-of-base')).to.be.true;
        });

        it('should return false for one that does not exist', function () {
            expect(questions.isValidProblemType('nonexistantproblemtype')).to.be.false;
        });

    });

});









