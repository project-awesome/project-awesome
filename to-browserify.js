exports.$=require("jquery");
exports.pa=require("./index.js");

exports.printMsg = function() {
    console.log("This is a message from the demo package");
}

exports.qd = {
    "version" : "0.1",
    "questions": [{
	"question": "fr-change-of-base",
	"repeat": 2
    },
		  {
		      "question": "mc-change-of-base",
		      "repeat": 3
		  }]
};

exports.$( document ).ready(function() {
    console.log("ready function called");
    var result= exports.pa.generate("json",JSON.stringify(exports.qd),"abcd1234");
    console.log("result=" + JSON.stringify(result));
});
	      

    
