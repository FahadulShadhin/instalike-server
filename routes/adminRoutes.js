const express = require('express');
const {
	getUsersList,
	editUserStatus,
} = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkAdminStatus } = require('../middlewares/checkAdminMiddeware');

const router = express.Router();

router.get('/', authenticate, checkAdminStatus, getUsersList);
router.patch('/:userId', authenticate, checkAdminStatus, editUserStatus);

module.exports = router;
