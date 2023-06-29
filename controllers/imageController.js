const asyncHandler = require('express-async-handler');
const {
	queryImages,
	queryTotalImageCount,
	queryImageDetailsById,
	addImage,
	deleteImage,
} = require('../models/imagesModel');
const { queryUserById } = require('../models/userModel');

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
				const data = await queryUserById(id);
				const { basic_info, account_info } = data.rows[0];
				uploaderData.push({
					username: basic_info.username,
					profileImage: basic_info.profile_image,
					status: account_info.status,
				});
			}
			const responseData = [];
			for (const i in imgData) {
				responseData.push({
					imgData: imgData[i],
					uploaderData: uploaderData[i],
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
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while fetching images.' });
		}
	} catch (err) {
		return res.status(500).send({
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
			const ownerDetails = await queryUserById(ownerId);
			const ownerBasicInfo = ownerDetails.rows[0].basic_info;

			const imageDetails = {
				image_data: imgData,
				owner_data: ownerBasicInfo,
			};

			if (imgData.length === 0) {
				return res.status(404).send({ message: 'Image not found.' });
			}
			return res.status(200).send({ message: 'Success', data: imageDetails });
		} catch (err) {
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while fetching image.' });
		}
	} catch (err) {
		return res.status(500).send({
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
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while uploading image.' });
		}
	} catch (err) {
		return res.status(500).send({
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
		const user = req.user;
		const userId = user[0].id;
		const imgId = req.params.imgId;

		try {
			await deleteImage(imgId, userId);
			res.status(200).send({ message: 'Image deleted successfully.' });
		} catch (err) {
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while deleting image.' });
		}
	} catch (err) {
		return res.status(500).send({
			message: 'Internal server error.',
		});
	}
});

module.exports = { getImages, getImageDetails, uploadImage, removeImage };
