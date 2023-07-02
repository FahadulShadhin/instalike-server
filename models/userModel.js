const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryUserById = asyncHandler(async (id) => {
	const query = `
		SELECT * FROM users 
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
		SELECT username, email, fullname, phone_no, profession, bio, profile_image_url
		FROM users
		WHERE id = $1;
	`;
	const data = await client.query(query, [id]);
	return data;
});

const queryInterests = asyncHandler(async (id) => {
	const query = `SELECT interest FROM interests WHERE user_id = $1;`;
	const data = client.query(query, [id]);
	return data;
});

const querySocials = asyncHandler(async (id) => {
	const query = `SELECT social_link FROM socials WHERE user_id = $1;`;
	const data = client.query(query, [id]);
	return data;
});

const queryAdminStatus = asyncHandler(async (id) => {
	const query = `SELECT is_admin FROM users WHERE id = $1;`;
	const data = await client.query(query, [id]);
	return data;
});

const queryUesrStatus = asyncHandler(async (id) => {
	const query = `SELECT status FROM users WHERE id = $1;`;
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

const addInterest = asyncHandler(async (userId, newInterest) => {
	const query = `
 		INSERT INTO interests (user_id, interest)
		VALUES ($1, $2);
	`;
	await client.query(query, [userId, newInterest]);
});

const addSocial = asyncHandler(async (userId, newSocial) => {
	const query = `
 		INSERT INTO socials (user_id, social_link)
		VALUES ($1, $2);
	`;
	await client.query(query, [userId, newSocial]);
});

const deleteInterest = asyncHandler(async (userId, interest) => {
	const query = `
		DELETE FROM interests
		WHERE user_id = $1
		AND interest = $2;
	`;
	await client.query(query, [userId, interest]);
});

const deleteSocial = asyncHandler(async (userId, socialLink) => {
	const query = `
		DELETE FROM socials
		WHERE user_id = $1
		AND social_link = $2;
	`;
	await client.query(query, [userId, socialLink]);
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
	queryUesrStatus,
	queryInterests,
	querySocials,
	addInterest,
	addSocial,
	deleteInterest,
	deleteSocial,
};
