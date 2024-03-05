import axios from "axios";

async function joke(msg) {
	const headers = {
		'Accept': 'application/json'
	}

	const response = await axiosGetRequest('https://icanhazdadjoke.com', headers);
	msg.channel.send("Here's your joke!");
	msg.channel.send(response.data.joke);
}

async function axiosGetRequest(url, headers) {
	const response = await axios.get(url, {
		headers: headers
	});
    return response;
}

// module.exports = joke;
export default joke;