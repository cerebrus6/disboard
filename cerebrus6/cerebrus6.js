const fs = require("fs");
const link = require("./link.js");
const input = require('./asynchronousInput.js');

(async function() {
	let choice = '';
	while(choice!="exit") {
		choice = await input("> ");
		// This waits till the function finishes functioning before moving on to the next user input
		await link(choice);
	}
}());