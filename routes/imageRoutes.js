const express = require('express');
const { uploadImage } = require('../controllers/imageController');
const { authenticate } = require('../middlewares/authMIddleware');

const router = express.Router();

router.post('/', authenticate, uploadImage);
module.exports = router;
