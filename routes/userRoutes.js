const express = require('express');
const {
	registerUser,
	authenticateUser,
	getUserProfile,
	updateUserProfile,
} = require('../controllers/userControllers');
const { authenticate } = require('../middlewares/authMIddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/:userId', authenticate, getUserProfile);
router.post('/:userId', authenticate, updateUserProfile);
module.exports = router;
