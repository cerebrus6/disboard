async function safeBet(msg, amount = 0, tries = 0) {
	let safeBet = parseInt(amount.toString().replace(/,/g, ""));
	let divisor = 0;
	for(let i = 0; i < tries; i++) {
		divisor += Math.pow(2, i);
	}
	safeBet = safeBet/divisor;
	for(let i = 0; i < tries; i++) {
		msg.channel.send("Round " + (i + 1) + " = " + Math.floor(safeBet*Math.pow(2, i)));
	}
	msg.channel.send("Chance of Winning = " + (100 - (1/Math.pow(2,tries)*100)) + "%");
	msg.channel.send("Safe Bet = " + Math.floor(safeBet));
}

// module.exports = safeBet;
export default safeBet;