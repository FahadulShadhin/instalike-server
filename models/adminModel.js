const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUsersList = asyncHandler(async () => {
	const query = `SELECT * FROM users;`;
	const data = await client.query(query);
	return data;
});

const editStatus = asyncHandler(async (id, newStatus) => {
	const query = `
		UPDATE users
		SET account_info['status'] = to_jsonb($2::text)
		WHERE id = $1;
	`;
	await client.query(query, [id, newStatus]);
});

module.exports = { queryUsersList, editStatus };
