import axios from "axios";

async function person(msg) {
	msg.channel.send("Here's your person!");
	const img = await axiosGetRequest('https://thispersondoesnotexist.com');
        msg.channel.send({
          files: [{ attachment: 'https://thispersondoesnotexist.com', name: 'person.jpg' }],
        });
}

async function axiosGetRequest(url) {
	const response = await axios.get(url);
    return response;
}

// module.exports = person;
export default person;