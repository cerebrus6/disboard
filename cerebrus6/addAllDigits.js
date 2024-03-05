// Modules: input, filesystem
const fs = require("fs");
const input = require("./asynchronousInput.js");
const readline = require("readline");

// This removes all nonDigit followed by whitespace combination and starting spaces followed by digit combination
// Results in a string of digits separated by whitespace
// Remove nonDigit followed by whitespace
let removeRegExp = /[^\d]\s|(^\s\d)|[^\d\s]\d|[^\d\s]/;

// A remover that recursively finds the index of the first matching invalid component and cuts it out from the string using a regex that matches those invalid components
let remove = (str, regExp) => 
							(str.search(regExp)!=-1)	? remove(str.slice(0, str.search(regExp)) + str.slice(str.search(regExp) + 1), regExp)
														: ((str.search(/\d/) === -1) ? "0" : str);

async function addAllDigits() {
	// Get fileName
	let fileName = await input();

	// Read file line by line
	const fileStream = fs.createReadStream(fileName);
	const rl = readline.createInterface({
		input: fileStream,
		crlfDelay: Infinity
		// Note: we use the crlfDelay option to recognize all instances of CR LF
		// Carriage Return and Line Feed('\r\n') in input.txt as a single line break.
	})
	let result = 0, parsedLine;
	for await(const line of rl) {

		// Parse line
		parsedLine = remove(line, removeRegExp).split(" ");

		// Add all valid digits
		parsedLine.forEach(function(item, index, array) {
			result += parseInt(item);
		})
	}
	// Print result
	console.log(result);
}

module.exports = addAllDigits;

// Pseudocode
// Get fileName
// Read file line by line
// Parse line => Make parser function
// Add all valid digits
// Print result