var _und = require("underscore")._;
var MCQuestionValidator = require('./MCQuestionValidator');
var InputQuestionValidator = require('./InputQuestionValidator');


function isValid(q) {

	// Required for all question formats

	if (typeof q !== 'object') return false;

	// q.question (must exist + be a string)
	if (!(_und.has(q, 'question'))) return false;
	if (typeof q.question !== 'string') return false;

	// q.format (must exist + be a string)
	if (!(_und.has(q, 'format'))) return false;
	if (typeof q.format !== 'string') return false;

	// q.answer (must exist)
	if (!(_und.has(q, 'answer'))) return false;

	if (q.format == 'multiple-choice')
		return MCQuestionValidator.isValid(q);
	if (q.format == 'input')
		return InputQuestionValidator.isValid(q);
	
	throw "Question Format Error: " + q.format + " is not a defined format.";

	return true;
}

module.exports.isValid = isValid;