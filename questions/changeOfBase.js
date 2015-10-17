
var defaultConversions = [ 
    { radix:{ from: 10, to: 2 }, range:{ min: 0, max: 255} },
    { radix:{ from: 2, to: 10 }, range:{ min: 0, max: 255} },
    { radix:{ from: 2, to: 8 }, range:{ min: 0, max: 511 } },
    { radix:{ from: 8, to: 2 }, range:{ min: 0, max: 63 } },
    { radix:{ from: 2, to: 16 }, range:{ min: 0, max: 65535} },
    { radix:{ from: 16, to: 2 }, range:{ min: 0, max: 65535} } 
];


function radixDescription(randomStream, radix) {

    // choose "base 16" or "hexademical" ?
    var useWordOrNumberToDescribeBase = randomStream.nextIntRange(2);

    if (useWordOrNumberToDescribeBase == 0)
        return "base " + radix;

    switch(radix) {
        case 8: return "octal";
        case 16: return "hexadecimal";
        case 2: return "binary";
        case 10: return "decimal";
        default: return "base " + radix;
    }

}

function chooseNumber(randomStream, range) {
	var expression = range.max-range.min + 1;
	var randomResult = randomStream.nextIntRange(expression);
	var result = range.min + randomResult;

	console.log("expression="+expression);
	console.log("result="+result);
	console.log("randomStream="+JSON.stringify(randomStream));

	console.log("randomResult="+randomResult);
	return result;
}

function tryToAdd(newChoiceFormatted, uniqueChoices, answerChoices, numChoices) {
	console.log("tryToAdd:")
	console.log(" newChoiceFormatted=",newChoiceFormatted);
	console.log(" answerChoices.length=",answerChoices.length);
	console.log(" numChoices",numChoices);
	if (answerChoices.length >= numChoices)
		return;
	if (!uniqueChoices.has(newChoiceFormatted)) {
		uniqueChoices.add(newChoiceFormatted);
		answerChoices.push( {value: newChoiceFormatted, flag: false} );
	}
}

function distractorsFor(fromRad,toRad,from,numberToConvert) {

	var distractorRadices = {
    	"8" : [10,16],
    	"10" : [8,16],
    	"16" : [8,10]
	};	
	
	var result=[];

	if (toRad in distractorRadices) {
		for ( i=0; i < distractorRadices[toRad].length; i++) {
			var thisRad = distractorRadices[toRad][i];
			var badAnswer = numberToConvert.toString(thisRad);
			result.push(badAnswer);
		}
	}

	// If fromRad is in distractor radices, try interpreting the number in a different
	// radix than the intended one.   If the number we are converting is legit in that base,
	// convert from that number, correcttly, to the toRadix and try adding that as a distractor

	if (fromRad in distractorRadices) {
		for ( i=0; i< distractorRadices[fromRad].length; i++) {
			var thisRad = distractorRadices[fromRad][i];
			// can the string "from" be legally intepreted as a number in thisRad?
			// if so, then try to distract the student with that number correctly converted to the toRad
		
			var wrongInterpretationOfFrom = parseInt(from,thisRad);
			if (!isNaN(wrongInterpretationOfFrom)) {
				var badAnswer = wrongInterpretationOfFrom.toString(toRad);
				result.push(badAnswer);
			}
		}
	}

	console.log("result of distractorsFor:",result);
    return result;
}

module.exports.changeOfBaseQuestion = function(randomStream, params) {

    console.log("randomStream at 98 = " + JSON.stringify(randomStream));

    var conversions = (params && params.conversions && params.conversions.length > 0) ? params.conversions : defaultConversions;
    
    var whichConversion = randomStream.nextIntRange(conversions.length)

    var numToConvert = chooseNumber(randomStream, conversions[whichConversion].range);

    var fromRad = conversions[whichConversion].radix.from;
    var toRad = conversions[whichConversion].radix.to;      
    
    var from = numToConvert.toString(fromRad);
    
    var fromDesc = radixDescription(randomStream, fromRad);
    var toDesc = radixDescription(randomStream, toRad);
    var answerAsString = numToConvert.toString(toRad);
    console.log("randomStream at 113 = " + JSON.stringify(randomStream));
	//Array of {String, bool} pairs: the string representation of a number in a particular base
	//and a flag indicating whether or not it is the correct answer.
	var numChoices = 5;
	var answerChoices = [{value: answerAsString, flag: true}];
	var uniqueChoices = new Set([answerAsString]);

	// If toRad is in distractor radices, try adding the right answer in a wrong radix to the list.

	var distractors = distractorsFor(fromRad,toRad,from,numToConvert);

	console.log("strategic distractors")
	while ( (numChoices > answerChoices.length) && (distractors.length > 0) ) {
		var thisDistractor=distractors.shift();
		tryToAdd(thisDistractor, uniqueChoices, answerChoices, numChoices);
	}
	
	console.log("Random distractors")
	while (numChoices > answerChoices.length) {
		console.log("conversions[whichConversion].range = " + JSON.stringify(conversions[whichConversion].range));
		var thisDistractorNum = chooseNumber(randomStream, conversions[whichConversion].range);
		console.log("thisDistractorNum=" + thisDistractorNum);
		var thisDistractorString = thisDistractorNum.toString(toRad);
		console.log("thisDistractorString=" + thisDistractorString);

		tryToAdd(thisDistractorString, uniqueChoices, answerChoices, numChoices);
	}
	
	randomStream.shuffle(answerChoices);

	//Find the correct answer
	for(var i=0; i<answerChoices.length; i++) {
		if(answerChoices[i].flag == true)
			this.answer = i;           
	}
	this.choices = answerChoices.map(function(c) {
		return c.value;
	});
	this.format = 'multiple-choice';
	this.question = "Convert " + from + " from " + fromDesc + " to " + toDesc + ".";
};

module.exports.validateParameters = function(params) {
	if (params === undefined) return [];
	if (typeof params !== 'object') return [{ type: 'NonObjectParameters', path: []}];
    return [];
}
