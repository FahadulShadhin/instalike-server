const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUserById = asyncHandler(async (id) => {
	const query = `SELECT * FROM users WHERE id= $1;`;
	const data = await client.query(query, [id]);
	return data;
});

const queryUserByEmail = asyncHandler(async (email) => {
	const query = `SELECT * FROM users WHERE basic_info->>'email' = $1;`;
	const data = await client.query(query, [email]);
	return data;
});

const createUser = asyncHandler(async (username, email, password) => {
	const query = `INSERT INTO users (password, basic_info) VALUES ($1, $2);`;
	const newUser = { username, email };
	await client.query(query, [password, newUser]);
});

const updateUser = asyncHandler(
	async (basic_info, interests, account_info, id) => {
		const query = `
			UPDATE users
			SET 
				basic_info = $1::jsonb,
				interests = $2::jsonb,
				account_info = $3::jsonb
			WHERE id = $4;
			`;
		const values = [
			JSON.stringify(basic_info),
			JSON.stringify(interests),
			JSON.stringify(account_info),
			id,
		];
		await client.query(query, values);
	}
);

const dactivateAccount = asyncHandler(async (id) => {
	const query = `
		UPDATE users
		SET account_info = jsonb_set(account_info, '{status}', '"deactivated"')
		WHERE id = $1;
	`;
	await client.query(query, [id]);
});

module.exports = {
	queryUserById,
	queryUserByEmail,
	createUser,
	updateUser,
	dactivateAccount,
};
