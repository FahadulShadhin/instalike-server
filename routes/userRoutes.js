const express = require('express');
const {
	registerUser,
	authenticateUser,
	userProfile,
} = require('../controllers/userControllers');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
// router.get('/profile', authenticate, userProfile);
module.exports = router;
