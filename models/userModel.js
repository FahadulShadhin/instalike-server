const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUserById = asyncHandler(async (id) => {
	const data = await client.query(`SELECT * FROM users WHERE id= $1;`, [id]);
	return data;
});

const queryUserByEmail = asyncHandler(async (email) => {
	const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
		email,
	]);
	return data;
});

const createUser = asyncHandler(async (username, email, password) => {
	await client.query(
		`INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`,
		[username, email, password]
	);
});

const updateUser = asyncHandler(async () => {
	console.log('update');
});

module.exports = { queryUserById, queryUserByEmail, createUser, updateUser };
