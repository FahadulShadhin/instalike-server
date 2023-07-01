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
	dactivateAccount,
	queryAdminStatus,
	queryPasswordHash,
	updatePassword,
	queryUserBasicInfo,
};
