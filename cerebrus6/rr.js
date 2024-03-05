let input = require("./asynchronousInput.js")

async function rr() {
	let inputs = await input("(NumOfRounds, Repeat, Stats, Print, certainValue, safeBet)> ");
	inputs = inputs.split(" ");
	let numOfRounds = inputs[0];
	let repeat = (inputs[1])?inputs[1]:1;
	let stats = (inputs[2]=="t")?true:false;
	let print = (inputs[3]=="f")?false:true;
	let certainValue = (inputs[4])?inputs[4]:0;
	let safeBet = (inputs[5])?inputs[5]:500000;
		let totalNumberOfRoundsPlayed = 0, totalNumberOfRoundsWon = 0, totalNumberOfRoundsLost = 0, max = 0;
		let numberOfRoundsPlayed = 0, numberOfRoundsWon = 0, numberOfRoundsLost = 0;
		let consecutiveLoss = 0;
		let gains = 0;
		let loss = 0;
		let random;
		let counter = 0;
		let lossSessions = 0;
		while(repeat > 0) {
			if(max < numberOfRoundsPlayed) {
				max = numberOfRoundsPlayed;
			}
			if(numberOfRoundsWon < numOfRounds) {
				lossSessions += 1;
			}
		numberOfRoundsPlayed = 0;
		numberOfRoundsWon = 0;
		numberOfRoundsLost = 0;
		let lostAfter = 0;
			while(true) {
				random = Math.random();
				totalNumberOfRoundsPlayed += 1;
				numberOfRoundsPlayed += 1;
				if(random < 0.50) {
					// Losing
					totalNumberOfRoundsLost += 1;
					numberOfRoundsLost += 1;
					loss += calculateGainsOrLoss(consecutiveLoss, safeBet);
					consecutiveLoss += 1;
				} else {
					// Winning
					gains += calculateGainsOrLoss(consecutiveLoss, safeBet);
					totalNumberOfRoundsWon += 1;
					numberOfRoundsWon += 1;
					consecutiveLoss = 0;
				}

				if (consecutiveLoss == numOfRounds) {
					break;
				}
			}
			counter++;
			if(print) {
				console.log("Session ", counter, "\nnumberOfRoundsPlayed = ", numberOfRoundsPlayed, "\nnumberOfRoundsWon = ", numberOfRoundsWon, "\nnumberOfRoundsLost = ", numberOfRoundsLost);
				console.log("Lost ", numOfRounds, " consecutive time/s after ", numberOfRoundsPlayed - numOfRounds ," round/s\n");
			}
			repeat--;
		}
		console.log("Total Sessions = ", inputs[1]);
		console.log("There are ", lossSessions," sessions that have less than ", calculateGainsOrLoss(numOfRounds, safeBet)/safeBet," wins")
		console.log("There are ", inputs[1] - lossSessions," sessions that have greater than or equal", calculateGainsOrLoss(numOfRounds, safeBet)/safeBet," wins")
		console.log("Total Rounds Played = ", totalNumberOfRoundsPlayed);
		console.log("Total Rounds Won = ", totalNumberOfRoundsWon);
		console.log("Total Rounds Lost = ", totalNumberOfRoundsLost);
		console.log("Maximum Rounds played before losing ", numOfRounds," consecutive times = ", max);
		console.log("Total Gains = ", gains);
		console.log("Total Loss = ", loss);
		console.log("Difference = ", gains - loss);
}

function calculateGainsOrLoss(game, safeBet) {
	let result = 0;
	let counter = 1;
	if(game==0)
		return parseInt(safeBet);
	for(let i = 1; i <= game; i++) {
		result += (safeBet*counter);
		counter *= 2;
	}
	// console.log(result);
	return result;
}

module.exports = rr;