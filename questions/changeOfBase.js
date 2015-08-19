
module.exports.changeOfBaseQuestion = function(randomStream) {
	var number = randomStream.nextIntRange(240)+15;
	
	var baseArray = [ {base: "decimal", value: number.toString(10), radix: 10}, {base: "hexadecimal", value: number.toString(16), radix: 16}, {base: "binary", value: number.toString(2), radix: 2} ];
	
	randomStream.shuffle(baseArray);
	
	var a = baseArray[0];
	var b = baseArray[1];

	//Array of {String, bool} pairs: the string representation of a number in a particular base
	//and a flag indicating whether or not it is the correct answer.
	var numChoices = 4;
	var answerChoices = [{value: b.value, flag: true}];
	var uniqueChoices = new Set([b.value]);
	while (numChoices > answerChoices.length) {
		var newChoice = randomStream.nextIntRange(240)+15;
		if (!uniqueChoices.has(newChoice)) {
			uniqueChoices.add(newChoice);
			answerChoices.push( {value: newChoice.toString(b.radix), flag: false} );
		}
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
	this.question = "Convert " + a.value + " from " + a.base + " to " + b.base + ".";
};










