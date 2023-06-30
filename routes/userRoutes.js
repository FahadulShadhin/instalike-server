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

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/:userId', authenticate, getUserProfile);
router.put('/update', authenticate, updateUserProfile);
router.delete('/delete', authenticate, deleteAccount);
router.patch('/change_password', authenticate, changePassword);

module.exports = router;
