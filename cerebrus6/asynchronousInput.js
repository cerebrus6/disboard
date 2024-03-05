const readline = require('readline');
function input(query="") {
	// calling input will create an instance of a stream
	// this instance will terminate after getting the input
	// this won't conflict with other streams
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});
	return new Promise((resolve, reject) => {
		rl.question(query, ans => {
			resolve(ans);
    		rl.close();
		})
	});
}

module.exports = input;