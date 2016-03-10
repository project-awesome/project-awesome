var expect = require("chai").expect;
var questions = require("../../questions/index");

describe('questions', function () {

    it('should be that questionTypes exists and is an object', function () {
        expect(questions.questionTypes).to.exist;
        expect(questions.questionTypes).to.be.an("object");
    });

    describe('isValidQuestionType(questionType)', function () {

        it('should return true when the question type is a property in questionTypes', function () {
            expect(questions.isValidQuestionType('fr-change-of-base')).to.be.true;
        });

        it('should return false for one that does not exist', function () {
            expect(questions.isValidQuestionType('nonexistantquestiontype')).to.be.false;
        });

    });

});









