const asyncHandler = require('express-async-handler');
const { addImage } = require('../models/imagesModel');

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

module.exports = { uploadImage };
