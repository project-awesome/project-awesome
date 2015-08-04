
module.exports.changeOfBaseQuestion = function(randomStream) {
	var number = randomStream.nextIntRange(240)+15;

	var baseArray = [ {base: "decimal", value: number.toString(10), radix: 10}, {base: "hexadecimal", value: number.toString(16), radix: 16}, {base: "binary", value: number.toString(2), radix: 2} ];

	randomStream.shuffle(baseArray);

	this.a = baseArray[0];
	this.b = baseArray[1];

	//Array of {String, bool} pairs: the string representation of a number in a particular base
	//and a flag indicating whether or not it is the correct answer.
	this.answerChoices = [ 
		{value: this.b.value, flag: true}, 
		{value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false},
		{value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false},
		{value: (randomStream.nextIntRange(240)+15).toString(this.b.radix), flag: false} 
	];

	randomStream.shuffle(this.answerChoices);

	//Find the correct answer
	this.answer = 0;
	for(var i=0; i<this.answerChoices.length; i++) {
		if(this.answerChoices[i].flag == true)
			this.answer = i;           
	}
	this.choices = this.answerChoices.map(function(c) {
		return c.value;
	});
	this.format = 'multiple-choice';
};










