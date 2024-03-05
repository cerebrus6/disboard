const fs = require("fs");
const clipboardy = require("clipboardy");
const emojiArr = fs.readFileSync("emojis.txt").toString().split(",");

function getRandomEmoji() {
		let length = emojiArr.length;
		let chosenEmoji = emojiArr[Math.floor(Math.random()*length)];
		let hex = chosenEmoji.codePointAt(0).toString(16)
		let emo = String.fromCodePoint("0x".concat(hex));
		console.log("Unicode: U+".concat(hex));
		clipboardy.writeSync(chosenEmoji)
		if(clipboardy.readSync()==chosenEmoji)
			console.log("Emoji successfuly copied to clipboard!");
		else
			console.log("Emoji not successfuly copied to clipboard!");			
}

// cliboardy.writeSync(string) lets you copy to clipboard
// cliboardy.readSync() lets you read the clipboard

module.exports = getRandomEmoji;