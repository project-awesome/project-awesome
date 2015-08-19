var _und = require("underscore")._;

function isPositiveInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0) && x >= 0;
}

function isValid(q) {

	// q.choices
	if (!(_und.has(q, 'choices'))) return false;
	if (!Array.isArray(q.choices)) return false;
	if (q.choices.length < 1) return false;
	for (var i = 0; q.choices.length > i; i++)
		if (typeof q.choices[i] !== 'string')
			return false;

	// q.answer (should be positive integer corresponding to correct choice index)
	if (!isPositiveInteger(q.answer)) return false;
	if (q.answer >= q.choices.length) return false;

	return true;
}

module.exports.isValid = isValid;