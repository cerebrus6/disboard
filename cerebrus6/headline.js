import axios from "axios";

async function headline(msg) {
	let url = "https://newsapi.org/v2/top-headlines?country=ph&apiKey=135bcd2ec68745cd928deac1550acb0b";
	let x = await getData(url).then(data => {
		return data.articles[0].title;
	}).then(rep => {
		msg.channel.send(rep);
	});	
}

async function getData(url) {
	try {
		data = await axios.get(url);
		return data.data;
	} catch(error) {
		console.log(error);
	}
}

// module.exports = headline;
export default headline;