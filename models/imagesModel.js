const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const addImage = asyncHandler(async (id, filepath, description) => {
	const query = `
    INSERT INTO images (user_id, filepath, description, created_at)
    VALUES ($1, $2, $3, now());
  `;
	await client.query(query, [id, filepath, description]);
});

module.exports = { addImage };
