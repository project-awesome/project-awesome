function array2cloze (thisArray) {
    return "NOT IMPLEMENTED YET";    
}

function fr2cloze (qi) {
    var text = "<div>" + qi.questionText  +"</div>";
    var points = ("points" in qi) ? qi.points : 1;
    var clozeText = "{" + points + ":SA:=" + qi.answer +  "}";
    return text + clozeText;
}

function mc2cloze (qi) {
    var text = "<div>" + qi.questionText  +"</div>";
    var points = ("points" in qi) ? qi.points : 1;
    var clozeText = "{" + points + ":MCV:";

    for (var i=0; i< qi.distractors.length ; i++) {
	if (i!=0)
	    clozeText += "~";
	if (i==qi.answerIndex) 
	    clozeText += "=";
	clozeText += qi.distractors[i];	
    }
    
    clozeText += "}";
    return text + clozeText;
}

function label2cloze (qi) {
    return "NOT IMPLEMENTED YET";    
}


function qi2cloze(qi) {

    if (Array.isArray(qi)) {
	return array2cloze(qi);
    } 
    
    if ("label" in qi) {
	return label2cloze(qi);
    }
    
    if ("outputType" in qi  && qi.outputType=="fr") {
	return fr2cloze(qi);
    }
    
    if ("outputType" in qi  && qi.outputType=="mc") {
	return mc2cloze(qi);
    }

    throw new Error("invalid argument to qi2cloze: " + JSON.stringify(qi));

}

module.exports.qi2cloze = qi2cloze;
