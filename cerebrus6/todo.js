import dotenv from 'dotenv';
dotenv.config({ path: dotenv.config({ path: './.env' }).error ? '../.env' : './.env' });

// const {	
// 	getCardsForList,
// 	getListsForBoard,
// 	getBoardsForUser,
// 	getCardsForUser,
// 	closeCard
// } = require('./trello.js');

import trelloModule from './trello.js';

const {
  getCardsForList,
  getListsForBoard,
  getBoardsForUser,
  getCardsForUser,
  closeCard
} = trelloModule;

var boards = [], lists = [], cards = [];
var board, list, card, res;

async function todo(msg, command = 'list') {
	console.time("get_data");
	await get_data();
	console.timeEnd("get_data");

	// Apply your filter conditions here
	const filters = [
	  // obj => obj.id === '622af625f474f58acc93e614',
	  obj => {
	  	board = boards.find(board => board.id === obj.idBoard);
	    // You can perform multiple checks or operations here
	    return board.name === 'test_board';
	  },
	];

	let data = filter_data(cards, filters);

	for(let i = 0; i < data.length; i++) {
		console.log(is_done(data[i]))
		board = boards.find(board => board.id === data[i].idBoard);
		list = lists.find(list => list.id === data[i].idList);
		data[i].board = board;
		data[i].list = list;
	}

	// await closeCard('653cf873774e28cdcd8a644c');
	// console.log(data[0].labels)
	// console.log(data.length);
	switch(command) {
		case 'list':
			return present_cards(msg, data);
			break;
	}
}

// Make card details human readable, filter out useless data
function present_cards(msg, data) {
	res = `\`\`\`Tasks\`\`\`\n`;
	// console.log(data[0].badges.attachmentsByType.trello);
	res += `===============================================================\n`
	for(let i = 0; i < data.length; i++) {
		res += ` -  ${data[i].board.name}: ${data[i].list.name} [${data[i].name}](${data[i].shortUrl})`

		let labels = data[i].labels ?? []
		for(let j = 0; j < labels.length; j++) {
			res += ` [\`${labels[j].name}\`]`
		}
		if(data[i].desc) {
			res += `: \n\`${data[i].desc}\``			
		}
		res += `\n`
		res += `===============================================================\n`
	}
	msg.channel.send(res);

	return res;
}

function is_done(card) {
	let labels = card.labels ?? [];
	console.log(labels)
	if(isStringInProperty(labels, 'Done', 'name')) {
		return true;
	} else {
		return false;
	}
}

function get_by_property(array, property) {

}

async function get_data() {
	cards = await getCardsForUser() ?? []
	boards = await getBoardsForUser() ?? []
	for(let i = 0; i < boards.length; i++) {
		list = await getListsForBoard(boards[i].id) ?? [];
		lists = [...lists, ...list];
	}

	return true;
}
// Data should be an array of objects
function filter_data(data, filters = []) {
	const isArrayOfObjects = Array.isArray(data) && data.every(item => typeof item === 'object');
	if(!isArrayOfObjects) {
		console.log('data parameter in filter_data should be an array of objects');
		return false;
	}
	// return data.filter(obj => customConditions.some(condition => condition(obj)));

	let counter = 0;
	let filtered_data = data.filter(obj => {
		if(filters.length === 0) {
			return true;
		}

	    if (filters.some(filter => filter(obj))) {
	      // If any custom condition is satisfied, include the object
	      return true;
	    } else {
	      // If none of the custom conditions are satisfied, exclude the object
	      return false;
	    }
	});
	return filtered_data;
}

function isStringInProperty(arr, str, property) {
  return arr.some(obj => obj[property] === str);
}

// module.exports = todo;
export default todo;

// todo('list');