// const axios = require("axios");

async function cat(msg) {
	msg.channel.send("Here's your cat!");

  let max, min;
  
  max = 4999, min = 0;
  let cat_no = Math.floor(Math.random() * parseInt(max - min)) + parseInt(min);
  max = 6, min = 1;
  let page_no = Math.floor(Math.random() * parseInt(max - min)) + parseInt(min);
  msg.channel.send(`https://d2ph5fj80uercy.cloudfront.net/0${page_no}/cat${cat_no}.jpg`);
  
	// const img = await axiosGetRequest('https://thiscatdoesnotexist.com');
  //       msg.channel.send({
  //         files: [{ attachment: 'https://thiscatdoesnotexist.com', name: 'cat.jpg' }],
  //       });
}

// async function axiosGetRequest(url) {
// 	const response = await axios.get(url);
//     return response;
// }

// module.exports = cat;
export default cat;