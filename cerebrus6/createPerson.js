const readline = require('readline');
const input = require('./asynchronousInput.js');
const fs = require('fs');

	class status {
		constructor(str, int, wis) {
			this.str = str;
			this.int = int;
			this.wis = wis;
		}		
		get stats() {
			return {
				str: parseInt(this.str),
				int: parseInt(this.int),
				wis: parseInt(this.wis)
			}
		}
	}

	class person {
		constructor(name, age, stats) {
			this.name = name;
			this.age = parseInt(age);
			this.status = (new status(...stats)).stats;
		}
		// Static methods and properties can only be accessed using the Class name
		// Ex. person.whoAmI();
		// static whoAmI() {
		// 	console.log("I am a person");
		// }
	}


async function createPerson() {
	let name = await input("Name: ");
	let age;
		while(isNaN(age)) {
			age = await input("Age: ");
			if(isNaN(age))
				await console.log("[ERR_NOT_A_NUMBER] - Age is just a number.");
		}
	let stats = [];
	let text = ["Strength", "Intelligence", "Wisdom"];
	let counter = 0;
	while(counter < 3) {				
		while(isNaN(stats[counter])) {
			stats[counter] = await input(text[counter].concat(": "));
			if(isNaN(stats[counter]))
				await console.log("[ERR_NOT_A_NUMBER]");
		}
		counter++;
	}
	let p = new person(name, age, stats);
	console.log(p);
}

module.exports = createPerson;