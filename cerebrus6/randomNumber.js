let input = require("./asynchronousInput.js")

async function rng() {
	let inputs = await input("(Percentage, Repeat, Stats, Print, certainValue)> ");
	inputs = inputs.split(" ");
	let percentage = (inputs[0])?inputs[0]/100:1;
	let repeat = (inputs[1])?inputs[1]:1;
	let stats = (inputs[2]=="t")?true:false;
	let print = (inputs[3]=="f")?false:true;
	let certainValue = (inputs[4])?inputs[4]:0;
	if(percentage <= 1 &&  percentage > 0) {
		let max = 0, totalRounds = 0, totalWin = 0, lessThanACertainValue = 0;
		for(let i = 0; i < repeat; i++) {
			let counter = 0;
			do
				counter += 1;
			// let randomRes = Math.random();
			// 0 to 1
			// console.log(Math.random()Math.random())
			while (Math.random() > percentage);
			totalRounds += counter;
			totalWin++;
			if(counter<certainValue)
				lessThanACertainValue++;
			if(i == 0)
				min = counter;
			else
				min = (counter < min)?counter:min;
			if(max < counter)
				max = counter;
			if(print)
				console.log("Won after ", counter, " round/s.")
		}
		if(stats)
			console.log(`{Max = ${max}\tMin = ${min}}\n{Total rounds = ${totalRounds}\tTotal win = ${totalWin}}\n{Average = 1 win per ${totalRounds/totalWin} rounds}`);
		if(certainValue!=0)
			console.log("There are ", lessThanACertainValue, " round/s that are less than ", certainValue);
	} else {
		console.log("Invalid Percentage");
	}
}

module.exports = rng;