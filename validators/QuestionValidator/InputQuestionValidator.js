var _und = require("underscore")._;

function isPositiveInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0) && x >= 0;
}

function isValid(q) {

	// q.answer (must be a string - for now)
	if (!(_und.has(q, 'answer'))) return false;

	return true;
}

module.exports.isValid = isValid;