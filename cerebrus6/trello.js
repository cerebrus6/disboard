import dotenv from 'dotenv';
dotenv.config({ path: dotenv.config({ path: './.env' }).error ? '../.env' : './.env' });

// You can generate your trello API key and token here
// https://trello.com/power-ups/admin
import axios from 'axios';
const api_key = process.env.TRELLO_API_KEY;
const api_token = process.env.TRELLO_API_TOKEN;

// Set up the base URL for Trello API
const apiUrl = 'https://api.trello.com/1';

async function getCardsForList(list_id) {
  const response = await axios.get(`${apiUrl}/lists/${list_id}/cards?key=${api_key}&token=${api_token}`)
  return response ? response.data : [];
}

async function getListsForBoard(board_id) {
  const response = await axios.get(`${apiUrl}/boards/${board_id}/lists?key=${api_key}&token=${api_token}`)
	return response ? response.data : [];
}

async function getBoardsForUser() {
  const response = await axios.get(`${apiUrl}/members/me/boards?key=${api_key}&token=${api_token}`)
  return response ? response.data : [];
}

async function getCardsForUser() {
  const response = await axios.get(`${apiUrl}/members/me/cards?key=${api_key}&token=${api_token}`)
  return response ? response.data : [];
}

async function closeCard(card_id = null) {
	if(!card_id) {
		return false;
	}

	const requestData = {
	  closed: true,
	  key: api_key,
	  token: api_token,
	};

	// Send a PUT request to close the card
	const response = await axios.put(`${apiUrl}/cards/${card_id}`, requestData)
	  .then(response => {
	    console.log('Card closed successfully');
	  })
	  .catch(error => {
	    console.error('Error closing the card:', error);
	  });
	  return response;
}

// module.exports = {
// 	getCardsForList,
// 	getListsForBoard,
// 	getBoardsForUser,
// 	getCardsForUser,
// 	closeCard
// }

export default {
	getCardsForList,
	getListsForBoard,
	getBoardsForUser,
	getCardsForUser,
	closeCard
}

// export {getCardsForList}; // Define getCardsForList function here
// export {getListsForBoard}; // Define getListsForBoard function here
// export {getBoardsForUser}; // Define getBoardsForUser function here
// export {getCardsForUser}; // Define getCardsForUser function here
// export {closeCard}; // Define closeCard function here
