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

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user with username, email, password, and optional is_admin flag.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *               is_admin:
 *                 type: boolean
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: Registration successful. User created.
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *       500:
 *         description: Server error.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: login successful.
 *       400:
 *         description: Bad request. Invalid input or missing fields.
 *       500:
 *         description: Server error.
 */
router.post('/login', authenticateUser);

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Retrieve user information.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response. User profile retrieved.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error.
 */
router.get('/profile', authenticate, checkUserStatus, getUserProfile);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update User Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               fullname:
 *                 type: string
 *               phone_no:
 *                 type: string
 *               bio:
 *                 type: string
 *               profession:
 *                 type: string
 *               add_interest:
 *                 type: string
 *               add_social_link:
 *                 type: string
 *               remove_interest:
 *                 type: string
 *               remove_social_link:
 *                 type: string
 *               profile_image_url:
 *                 type: string
 *                 format: url
 *               status:
 *                 type: string
 *               timezone:
 *                 type: string
 *               created_at:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - username
 *               - email
 *               - fullname
 *               - phone_no
 *               - profile_image_url
 *               - status
 *               - timezone
 *               - created_at
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error. Failed to update the user profile.
 */
router.put('/update', authenticate, checkUserStatus, updateUserProfile);

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Delete User Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error. Failed to delete the user account.
 */
router.delete('/delete', authenticate, checkUserStatus, deleteAccount);

/**
 * @swagger
 * /api/user/change_password:
 *   patch:
 *     summary: Change User Password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               new_password:
 *                 type: string
 *             required:
 *               - old_password
 *               - new_password
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error. Failed to change the user password.
 */
router.patch('/change_password', authenticate, checkUserStatus, changePassword);

module.exports = router;
