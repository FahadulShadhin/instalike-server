const express = require('express');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkAdminStatus } = require('../middlewares/checkAdminMiddeware');

const router = express.Router();

router.get('/', authenticate, checkAdminStatus, (req, res) =>
	res.send({ message: 'Admin dashboard.' })
);

module.exports = router;
