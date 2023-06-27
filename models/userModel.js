const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUserById = asyncHandler(async (id) => {
	const data = await client.query(`SELECT * FROM users WHERE id= $1;`, [id]);
	return data;
});

const queryUserByEmail = asyncHandler(async (email) => {
	const data = await client.query(
		`SELECT * FROM users WHERE basic_info->>'email' = $1;`,
		[email]
	);
	return data;
});

const createUser = asyncHandler(async (username, email, password) => {
	const query = `INSERT INTO users (basic_info) VALUES ($1);`;
	const newUser = { username, email, password };
	await client.query(query, [newUser]);
});

const updateUser = asyncHandler(
	async (basic_info, interest, account_info, id) => {
		const query = `
			UPDATE users
			SET 
				basic_info = $1::jsonb,
				interest = $2::jsonb,
				account_info = $3::jsonb
			WHERE id = $4;
			`;
		const values = [
			JSON.stringify(basic_info),
			JSON.stringify(interest),
			JSON.stringify(account_info),
			id,
		];
		await client.query(query, values);
	}
);

module.exports = { queryUserById, queryUserByEmail, createUser, updateUser };
