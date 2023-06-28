const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryImageDetailsById = asyncHandler(async (imgId) => {
	const query = `SELECT * FROM images WHERE id = $1`;
	const res = await client.query(query, [imgId]);
	return res;
});

const addImage = asyncHandler(async (userId, filepath, description) => {
	const query = `
    INSERT INTO images (user_id, filepath, description, created_at)
    VALUES ($1, $2, $3, now());
  `;
	await client.query(query, [userId, filepath, description]);
});

const deleteImage = asyncHandler(async (imgId, userId) => {
	// Only owner of the image will be able to delete.
	const query = `DELETE FROM images WHERE id = $1 AND user_id = $2;`;
	await client.query(query, [imgId, userId]);
});

module.exports = { queryImageDetailsById, addImage, deleteImage };
