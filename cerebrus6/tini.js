import axios from "axios";
import dotenv from 'dotenv';
dotenv.config({ path: dotenv.config({ path: './.env' }).error ? '../.env' : './.env' });

async function tini(msg, command = null, url = null, alias = null) {
	console.log(command)
	var shortened_url, message;
	switch(command) {
		case 'create':
			shortened_url = await create(url, alias);
			// msg.channel.send("Here's your tini url!");
			msg.channel.send(shortened_url);
			break;
		case 'list':
			shortened_urls = await get();
			message = present_urls(shortened_urls)
			msg.channel.send(message);
			break;
		case 'delete':
			shortened_urls = await get();
			let delete_url =  shortened_urls.find(shortened_url => {return ("https://tini.fyi/" + shortened_url.shortCode) === url});
			if(!delete_url) {
				msg.channel.send("URL not found.");
			} else {
				message = await del(delete_url.id)
				msg.channel.send(message);
			}
			break;
		default:
			msg.channel.send("Invalid Command");
	}
}

async function create(url, alias = null) {
	let data = {
		'destination': url
	}

	alias ? data.alias = alias : null;

	let headers = {
		"Authorization": `Bearer ${process.env.FYI_API_KEY}`,
		"Cookie": `token=${process.env.FYI_TOKEN}`,
	}
	try {
		const res = await axiosPostRequest('https://tini.fyi/api/v1/url/create', data, headers);		
		return res.data.data.shortUrl;
	} catch(err) {
		// console.log(err);
		// return JSON.stringify(err);
		return err.response.data.error;
	}

	// console.log(res.data)
	// console.log(res.data.shortUrl)

	// data: {
	//   status: 'success',
	//   data: {
	//     destination: 'https://www.facebook.com/',
	//     shortUrl: 'https://tini.fyi/Aj77p',
	//     createdAt: '2023-11-02T09:06:48.819Z'
	//   }
	// }
}

// Make card details human readable, filter out useless data
function present_urls(data) {
	res = `\`\`\`Urls\`\`\``;
	for(let i = 0; i < data.length; i++) {
		res += `\`\`\`https://tini.fyi/${data[i].shortCode}\`\`\``
		// res += `\`[Analytics: ${data[i]._count.analytics}]\`\n`

	}
	// msg.channel.send(res);
	return res;
}

async function get() {
	let headers = {
		// "Authorization": `Bearer ${process.env.FYI_API_KEY}`,
		"Cookie": `token=${process.env.FYI_TOKEN}`,
	}
	const res = await axiosGetRequest('https://tini.fyi/api/v1/my/links?limit=20', headers);
	// console.log(res.data)
	// console.log(res.data.shortUrl)
	return res.data.data;
	// data: {
	//   status: 'success',
	//   data: {
	//     destination: 'https://www.facebook.com/',
	//     shortUrl: 'https://tini.fyi/Aj77p',
	//     createdAt: '2023-11-02T09:06:48.819Z'
	//   }
	// }
}

async function del(id) {
	let headers = {
		// "Authorization": `Bearer ${process.env.FYI_API_KEY}`,
		"Cookie": `token=${process.env.FYI_TOKEN}`,
	}

	try {
		const res = await axiosDeleteRequest(`https://tini.fyi/api/v1/url/delete?id=${id}`, headers);
		return "Delete successful.";
	} catch(err) {
		// console.log(err);
		// return JSON.stringify(err);
		return "Failed to delete.";
	}
}

async function axiosGetRequest(url, headers) {
	const response = await axios.get(url, {
		headers: headers
	});
    return response;
}

async function axiosDeleteRequest(url, headers) {
	const response = await axios.delete(url, {
		headers: headers
	});
    return response;
}

async function axiosPostRequest(url, form_data, headers = null) {
	const response = await axios.post(url, form_data, {
		headers: headers
	});
    return response;
}

// module.exports = tini;
export default tini;