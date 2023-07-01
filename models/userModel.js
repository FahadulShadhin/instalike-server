const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUserById = asyncHandler(async (id) => {
	const query = `
		SELECT * 
		FROM users 
		WHERE id= $1;
	`;
	const data = await client.query(query, [id]);
	return data;
});

const queryUserByEmail = asyncHandler(async (email) => {
	const query = `
		SELECT * FROM users 
		WHERE email = $1;
	`;
	const data = await client.query(query, [email]);
	return data;
});

const queryUserBasicInfo = asyncHandler(async (id) => {
	const query = `
		SELECT username, email, fullname, phone_no, profession, bio, profile_image_url, social_links, interests
		FROM users 
		WHERE id = $1;
	`;
	const data = await client.query(query, [id]);
	return data;
});

const queryAdminStatus = asyncHandler(async (id) => {
	const query = `SELECT is_admin FROM users WHERE id = $1;`;
	const data = await client.query(query, [id]);
	return data;
});

const queryPasswordHash = asyncHandler(async (id) => {
	const query = `SELECT password FROM users WHERE id = $1;`;
	const data = await client.query(query, [id]);
	return data;
});

const updatePassword = asyncHandler(async (id, newPassword) => {
	const query = `UPDATE users SET password = $2 WHERE id = $1;`;
	await client.query(query, [id, newPassword]);
});

const createUser = asyncHandler(
	async (username, email, password, adminStatus) => {
		const query = `INSERT INTO users (password, username, email, is_admin) VALUES ($1, $2, $3, $4);`;
		await client.query(query, [password, username, email, adminStatus]);
	}
);

const updateUser = asyncHandler(async (clauses, values, counter, id) => {
	const query = `UPDATE users SET ${clauses.join(', ')} WHERE id = $${counter}`;
	client.query(query, [...values, id]);
});

const deactivateAccount = asyncHandler(async (id) => {
	const query = `
		UPDATE users
		SET status = 'deactivated'
		WHERE id = $1;
	`;
	await client.query(query, [id]);
});

module.exports = {
	queryUserById,
	queryUserByEmail,
	createUser,
	updateUser,
	deactivateAccount,
	queryAdminStatus,
	queryPasswordHash,
	updatePassword,
	queryUserBasicInfo,
};
