const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUsersList = asyncHandler(async () => {
	const query = `SELECT * FROM users;`;
	const data = await client.query(query);
	return data;
});

module.exports = { queryUsersList };
