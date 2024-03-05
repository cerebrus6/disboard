let modules = {
	r: "",
	// randomEmoji: require("./randomEmoji.js"),
	randomNumber: require("./randomNumber.js"),
	createPerson: require("./createPerson.js"),
	addAllDigits: require("./addAllDigits.js"),
	rng: require("./rng.js"),
	rr: require("./rr.js"),
	safeBet: require("./safeBet.js")
}

// keyword is an array. First element is the command, the next are the parameters
function link(keyword) {
	// This is evil
	// eval(keyword.concat("()"));

	// This is less evil
	// This removes the ! mark first before running the command
	if(modules[keyword[0].replace("!", "")]) {
		modules.r = (keyword[0] == "r")?modules.r:keyword;
		modules[modules.r].call();
	}
}
module.exports = link;