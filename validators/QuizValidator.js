var _und = require("underscore")._;
var QuestionValidator = require('./QuestionValidator');

function isPositiveInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0) && x >= 0;
}

function isSeedValid(seed) {
	return (typeof seed === 'string' && seed.match(/^[a-fA-F0-9]{8}$/) !== null && seed.length == 8);
}

function isValid(q) {

	if (typeof q !== 'object') return false;

	// q.seed
	if (!(_und.has(q, 'seed'))) return false;
	if (!isSeedValid(q.seed)) return false;

	// q.questions
	if (!(_und.has(q, 'questions'))) return false;
	if (!Array.isArray(q.questions)) return false;
	if (q.questions.length < 1) return false;
	for (var i = 0; q.questions.length > i; i++)
		if (!QuestionValidator.isValid(q.questions[i]))
			return false;

	return true;
}

module.exports.isValid = isValid;
module.exports.isSeedValid = isSeedValid;













