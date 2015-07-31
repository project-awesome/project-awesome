var _und = require("underscore")._;

function isPositiveInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0) && x >= 0;
}

function isValid(q) {

	if (typeof q !== 'object') return false;

	// q.question
	if (!(_und.has(q, 'question'))) return false;
	if (typeof q.question !== 'string') return false;

	// q.answers
	if (!(_und.has(q, 'answers'))) return false;
	if (!Array.isArray(q.answers)) return false;
	if (q.answers.length < 1) return false;
	for (var i = 0; q.answers.length > i; i++)
		if (typeof q.answers[i] !== 'string')
			return false;

	// q.correct
	if (!(_und.has(q, 'correct'))) return false;
	if (!isPositiveInteger(q.correct)) return false;
	if (q.correct >= q.answers.length) return false;

	return true;
}

module.exports.isValid = isValid;