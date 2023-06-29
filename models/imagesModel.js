const asyncHandler = require('express-async-handler');
const { client } = require('../config/db');

const queryImages = asyncHandler(async (offset, limit) => {
	const query = `SELECT * FROM images ORDER BY created_at DESC OFFSET $1 LIMIT $2;`;
	const data = await client.query(query, [offset, limit]);
	return data;
});

const queryTotalImageCount = asyncHandler(async () => {
	const query = `SELECT COUNT(id) from images;`;
	const totalImageCount = await client.query(query);
	return totalImageCount;
});

const queryImageDetailsById = asyncHandler(async (imgId) => {
	const query = `SELECT * FROM images WHERE id = $1;`;
	const data = await client.query(query, [imgId]);
	return data;
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

module.exports = {
	queryImages,
	queryTotalImageCount,
	queryImageDetailsById,
	addImage,
	deleteImage,
};
