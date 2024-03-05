const Discord = require("discord.js");
const Core = require("../core/core.js");

class Bot extends Core {
	constructor() {
		super(); // Call the constructor of the parent class

		this.client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
		this.modules = {
			rng: require("./cerebrus6/rng.js"),
			safeBet: require("./cerebrus6/safeBet.js"),
			meme: require("./cerebrus6/meme.js"),
			person: require("./cerebrus6/person.js"),
			cat: require("./cerebrus6/cat.js"),
			waifu: require("./cerebrus6/waifu.js"),
			headline: require("./cerebrus6/headline.js"),
			todo: require("./cerebrus6/todo.js"),
			tini: require("./cerebrus6/tini.js"),
			fantasy: require("./cerebrus6/fantasy.js"),
			snack: require("./cerebrus6/snack.js"),
			joke: require("./cerebrus6/joke.js"),
			help: this.help
		};
	}

	help(msg, command = null) {
		if(!command) {
			let guide_message = `\`\`\`Commands [Parameters]\`\`\``;

			for (const [command, function_obj] of Object.entries(this.modules)) {
				const fnString = function_obj.toString();
				const parameterNames = fnString
					.slice(fnString.indexOf('(') + 1, fnString.indexOf(')'))
					.split(', ')
					.filter(Boolean);
				parameterNames ? parameterNames.shift() : [];
				guide_message += `\`\`\`!${command} [${parameterNames.join('] [')}]\`\`\``
			}
			guide_message += `\nTo have details of a specific command, just input \`!help [command_name]\`\n`
			guide_message += `Note: Ignore the square brackets when typing the parameters.`
			msg.channel.send(guide_message);		
		}
	}

	start() {
		this.setupEventHandlers();
		this.client.login(process.env.CLIENT_TOKEN);
	}

	setupEventHandlers() {
		this.client.on('ready', () => {
		console.log(`Logged in as ${this.client.user.tag}!`);
		});

		this.client.on('messageCreate', async msg => {
			const user_id = msg.author.id;
			const message = msg.content.split(" ");
			const commands = Object.keys(this.modules).map(key => `!${key}`);

			if (commands.includes(message[0])) {
				this.processCommand(msg, message, user_id);
			}
		});
	}

	async processCommand(msg, message, user_id) {
		const command = message[0].replace("!", "");
		const params = message.slice(1);

		const values = {
			'command': command,
			'params': params.join(','),
			'added_by': user_id,
			'added_on': new Date().toISOString().replace('T', ' ').slice(0, 19)
		};

		await this.db.insert('command_history', values);

		if (this.modules[command]) {
			this.modules[command].call(this, msg, ...params);
		} else {
			msg.channel.send("Invalid Command");
		}
	}

	// Add other methods for module setup and other functionality
}

// const bot = new Bot();
// bot.start();
module.exports = Bot;