const express = require('express');
const {
	getImageDetails,
	uploadImage,
	removeImage,
} = require('../controllers/imageController');
const { authenticate } = require('../middlewares/authMIddleware');

const router = express.Router();

router.post('/', authenticate, uploadImage);
router.get('/:imgId', getImageDetails);
router.delete('/:imgId', authenticate, removeImage);

module.exports = router;
