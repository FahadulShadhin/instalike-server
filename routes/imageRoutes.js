const express = require('express');
const {
	getImages,
	getImageDetails,
	uploadImage,
	removeImage,
} = require('../controllers/imageController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkUserStatus } = require('../middlewares/checkUserStatusMIddleware');

const router = express.Router();

router.post('/', authenticate, checkUserStatus, uploadImage);
router.get('/', getImages);
router.get('/:imgId', getImageDetails);
router.delete('/:imgId', authenticate, checkUserStatus, removeImage);

module.exports = router;
