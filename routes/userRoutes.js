const express = require('express');
const {
	registerUser,
	authenticateUser,
	getUserProfile,
	updateUserProfile,
	deleteAccount,
	changePassword,
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkUserStatus } = require('../middlewares/checkUserStatusMIddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/profile', authenticate, checkUserStatus, getUserProfile);
router.put('/update', authenticate, checkUserStatus, updateUserProfile);
router.delete('/delete', authenticate, checkUserStatus, deleteAccount);
router.patch('/change_password', authenticate, checkUserStatus, changePassword);

module.exports = router;
