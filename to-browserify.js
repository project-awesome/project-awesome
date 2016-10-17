var $=require("jquery");
var pa=require("jquery");

exports.printMsg = function() {
    console.log("This is a message from the demo package");
}

$( document ).ready(function() {
    console.log("ready function called");
    console.log("pa=" + JSON.stringify(pa));
});


