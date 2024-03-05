const fs = require("fs");
const GraphemeSplitter = require("grapheme-splitter");
var splitter = new GraphemeSplitter();
function readTheFile(file) {
	return content = fs.readFileSync(file, 'utf-8');
}

function writeToFile(file, string) {
	let content = fs.readFileSync(file, 'utf-8');
	if(content.length!=0)
		fs.appendFileSync(file, '\n', error);
	fs.appendFileSync(file, string, error);
}

function emptyFile(file) {
	fs.writeFileSync(file, "");
}

function error(err) {
	if (err) throw err;
}

module.exports.emoji = function(text = "emojis.txt") {
	let file = text;
	let string = readTheFile(file);
	// remove all line breaks
	string = string.replace(/(\r\n|\n|\r)/gm, "");

	// separate all emojis with a comma
	string = splitter.splitGraphemes(string)
	string = string.join(",");

	// remove duplicate emojis
	string = Array.from(new Set(string.split(','))).toString();

	// delete the unmodified string in the file
	emptyFile(file);

	// write the changed string to the file
	writeToFile(file, string);	
	return string.split(",");
}