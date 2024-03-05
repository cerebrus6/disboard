import axios from "axios";

// This uses a webcrawler strategy
// First we get the html page
// Then we extract the image and title
async function snack(msg) {
    msg.channel.send("Here's your snack!");

    let max, min;
  
    max = 99999999999999999, min = 0;
    let snack_no = Math.floor(Math.random() * parseInt(max - min)) + parseInt(min);

    console.log(snack_no)

    try {
        const html = await axiosGetRequest('https://thissnackdoesnotexist.com/' + snack_no);
        const image_regex = /background-image:url\((.*?)\)/;
        const image = html.data.match(image_regex);
        const title_regex = /<title>(.*?)<\/title>/;
        const title = html.data.match(title_regex);

        if (image && title) {
            const image_url = image[1];
            const title_text = title[1];
            msg.channel.send(image_url);
            msg.channel.send(title_text);
            console.log()
        } else {
            msg.channel.send("No snack found");
        }
    } catch(err) {
        console.log(err);
    }

    // const pattern = /background-image:url\((.*?)\)/;
    // const matches = html.match(pattern);
    // msg.channel.send(`https://thissnackdoesnotexist.com/${snack_no}`);
    // if (matches) {
    //     const url = matches[1];
    //     msg.channel.send(url);
    //     console.log()
    // } else {
    //     msg.channel.send("No snack found");
    // }
	// const img = await axiosGetRequest('https://thissnackdoesnotexist.com');
  //       msg.channel.send({
  //         files: [{ attachment: 'https://thissnackdoesnotexist.com', name: 'snack.jpg' }],
  //       });
}

async function axiosGetRequest(url) {
	const response = await axios.get(url);
    return response;
}

// module.exports = snack;
export default snack;