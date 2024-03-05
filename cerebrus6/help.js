const axios = require("axios");

async function meme(msg) {
	const img = await axiosGetRequest('https://meme-api.com/gimme');
	msg.channel.send("Here's your meme!");
	msg.channel.send(img.data.url);	
}

async function axiosGetRequest(url) {
	const response = await axios.get(url);
    return response;
}

module.exports = meme;