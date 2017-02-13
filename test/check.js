var chai = require("chai"),
	sinon = require("sinon"),
	expect = chai.expect;

var projectAwesome = require('../'),
	//questions = require('../questions'),
	checkers = require('../checkers'),
	QuizBuilder = require('../QuizBuilder');



describe('check', function() {

	var sandbox;
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});
	afterEach(function() {
		sandbox.restore();
	});


		var checkSeedStub, isValidProblemTypeStub;
		beforeEach(function() {
			checkSeedStub = sandbox.stub(checkers.checkers, 'seed').returns("checkSeedReturn");
			isValidProblemTypeStub = sandbox.stub(checkers.checkers, 'problemType').returns("isValidProblemTypeReturn");
		});
		describe('seed', function() {
			it('should call QuizBuilder.checkSeed with appropriate parameter and return result', function() {
				var val = projectAwesome.check('seed', 'seedValue');
				expect(checkSeedStub.calledWith('seedValue')).to.be.true;
				expect(val).to.equal("checkSeedReturn");
			});
		});
		describe('problemType', function() {
			it('should call QuizBuilder.isValidProblemType with appropriate parameter and return result', function() {
				var val = projectAwesome.check('problemType', 'qTypeValue');
				expect(isValidProblemTypeStub.calledWith('qTypeValue')).to.be.true;
				expect(val).to.equal("isValidProblemTypeReturn");
			});
		});
		describe('typedoesntexist', function() {
			it('should throw error', function() {
				try {
					projectAwesome.check('typedoesntexist', 'shouldntmatter');
					expect(false).to.be.true;
				} catch(err) {
					expect(err).to.equal("Illegal Argument: " + 'typedoesntexist');
				}
			});	
		});
	});
