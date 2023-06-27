const express = require('express');
const {
	registerUser,
	authenticateUser,
	getUserProfile,
	updateUserProfile,
	deleteAccount,
} = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMIddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/:userId', authenticate, getUserProfile);
router.put('/:userId', authenticate, updateUserProfile);
router.delete('/:userId', authenticate, deleteAccount);
module.exports = router;
