const asyncHandler = require('express-async-handler');
const {
	queryImages,
	queryTotalImageCount,
	queryImageDetailsById,
	addImage,
	deleteImage,
	queryUserId,
} = require('../models/imagesModel');
const {
	queryUserById,
	queryUserBasicInfo,
	queryInterests,
	querySocials,
} = require('../models/userModel');

//@description     Get paginated images by offset and limit
//@route           GET /api/image/
//@access          Public
const getImages = asyncHandler(async (req, res) => {
	try {
		const { page, limit } = req.query;
		const offset = (page - 1) * limit;

		try {
			const data = await queryImages(offset, limit);
			const imgData = data.rows;
			const uploaderIds = imgData.map((img) => img.user_id);
			const uploaderData = [];
			for (const id of uploaderIds) {
				const userData = await queryUserById(id);
				const { username, profile_image_url, status } = userData.rows[0];
				uploaderData.push({
					username,
					profile_image_url,
					status,
				});
			}
			const responseData = [];
			for (const i in imgData) {
				responseData.push({
					image_data: imgData[i],
					uploader_data: uploaderData[i],
				});
			}

			const countData = await queryTotalImageCount();
			const totalCount = parseInt(countData.rows[0].count, 10);
			const totalPages = Math.ceil(totalCount / limit);

			return res.status(200).send({
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				totalPages,
				totalCount,
				message: 'success',
				data: responseData,
			});
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while fetching images.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Get image details
//@route           GET /api/image/:imgId
//@access          Public
const getImageDetails = asyncHandler(async (req, res) => {
	try {
		const imgId = req.params.imgId;

		try {
			const data = await queryImageDetailsById(imgId);
			const imgData = data.rows[0];
			const ownerId = imgData.user_id;
			const ownerData = await queryUserBasicInfo(ownerId);
			const ownerInterestsData = await queryInterests(ownerId);
			const ownerSocialsData = await querySocials(ownerId);
			const ownerBasicInfo = ownerData.rows[0];
			const ownerInterests = ownerInterestsData.rows;
			const ownerSocials = ownerSocialsData.rows;

			const imageDetails = {
				image_data: imgData,
				owner_data: { ownerBasicInfo, ownerInterests, ownerSocials },
			};

			if (imgData.length === 0) {
				return res.status(404).send({ message: 'Image not found.' });
			}
			return res.status(200).send({ message: 'Success', data: imageDetails });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while fetching image.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Upload image
//@route           POST /api/image/
//@access          Protected
const uploadImage = asyncHandler(async (req, res) => {
	try {
		const { id } = req.user[0];
		const { imagePath, description } = req.body;

		try {
			await addImage(id, imagePath, description);
			return res.status(201).send({ message: 'Image upload successful.' });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while uploading image.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Delete image
//@route           DELETE /api/image/:imgId
//@access          Protected
const removeImage = asyncHandler(async (req, res) => {
	try {
		// req.uesr is set by the authentication middleware.
		const authId = req.user[0].id;
		const imgId = req.params.imgId;
		const response = await queryUserId(imgId);
		const userId = response.rows[0].user_id;

		if (authId !== userId) {
			return res
				.status(401)
				.send({ message: 'Not authorized to delete this image.' });
		}

		try {
			const result = await deleteImage(imgId, authId);

			if (result.rowCount === 0) {
				return res.status(404).send({ message: 'Nothing to delete.' });
			}
			return res.status(200).send({ message: 'Image deleted successfully.' });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while deleting image.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

module.exports = { getImages, getImageDetails, uploadImage, removeImage };
