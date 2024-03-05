async function rng(msg, min = 1, max = 100) {
	if(max < min)
		await msg.channel.send("Error: Max should be greater than Min (e.g. !rng 1 100)");
	else
		await msg.channel.send(`${Math.floor(Math.random() * parseInt(max - min)) + parseInt(min)}`)
}

// module.exports = rng;
export default rng;