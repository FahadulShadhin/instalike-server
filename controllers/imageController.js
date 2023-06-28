const asyncHandler = require('express-async-handler');
const { addImage, deleteImage } = require('../models/imagesModel');

//@description     Upload image
//@route           POST /api/image/
//@access          Protected
const uploadImage = asyncHandler(async (req, res) => {
	try {
		const { userId, imagePath, description } = req.body;

		try {
			await addImage(userId, imagePath, description);
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

module.exports = { uploadImage, removeImage };
