var Promise = require('bluebird');

function input() {
	return new Promise(function(resolve, reject) {
		var inputChunks = [];
		process.stdin.resume();
	    process.stdin.setEncoding('utf8');
	    process.stdin.on('data', function (chunk) {
	        inputChunks.push(chunk);
	    });
	    process.stdin.on('end', function () {
	    	try {
	    		resolve(JSON.parse(inputChunks.join()));
	    	} catch (err) {
	    		return reject(err + "");
	    	}
	    });
	});
}

module.exports.input = input;






