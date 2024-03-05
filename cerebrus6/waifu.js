// const axios = require("axios");

async function waifu(msg) {
	msg.channel.send("Here's your waifu!");

  let max, min;
  
  max = 100000, min = 0;
  let waifu_no = Math.floor(Math.random() * parseInt(max - min)) + parseInt(min);
  msg.channel.send(`https://www.thiswaifudoesnotexist.net/example-${waifu_no}.jpg`);
  
	// const img = await axiosGetRequest('https://thiswaifudoesnotexist.com');
  //       msg.channel.send({
  //         files: [{ attachment: 'https://thiswaifudoesnotexist.com', name: 'waifu.jpg' }],
  //       });
}

// async function axiosGetRequest(url) {
// 	const response = await axios.get(url);
//     return response;
// }

// module.exports = waifu;
export default waifu;