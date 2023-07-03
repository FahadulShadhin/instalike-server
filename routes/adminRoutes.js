const express = require('express');
const {
	getUsersList,
	editUserStatus,
} = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkAdminStatus } = require('../middlewares/checkAdminMiddeware');

const router = express.Router();

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get All User Data (Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       401:
 *         description: Unauthorized. Admin access is required.
 *       500:
 *         description: Server error. Failed to retrieve user data.
 */
router.get('/', authenticate, checkAdminStatus, getUsersList);

/**
 * @swagger
 * /api/admin/{userId}:
 *   patch:
 *     summary: Update User Status (Admin)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: usrid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_status:
 *                 type: string
 *             required:
 *               - new_status
 *     responses:
 *       200:
 *         description: User status updated successfully.
 *       401:
 *         description: Unauthorized. Admin access is required.
 *       500:
 *         description: Server error. Failed to update the user status.
 */
router.patch('/:userId', authenticate, checkAdminStatus, editUserStatus);

module.exports = router;
