const express = require('express');
const {
	getImages,
	getImageDetails,
	uploadImage,
	removeImage,
} = require('../controllers/imageController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkUserStatus } = require('../middlewares/checkUserStatusMIddleware');

const router = express.Router();

/**
 * @swagger
 * /api/image/:
 *   post:
 *     summary: Upload Image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imagePath:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - imagePath
 *     responses:
 *       201:
 *         description: Image uploaded successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error. Failed to upload the image.
 */
router.post('/', authenticate, checkUserStatus, uploadImage);

/**
 * @swagger
 * /api/image:
 *   get:
 *     summary: Get Paginated Images
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: The page number of the results.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: true
 *         description: The maximum number of images per page.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paginated images retrieved successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       500:
 *         description: Server error. Failed to retrieve the paginated images.
 */
router.get('/', getImages);

/**
 * @swagger
 * /api/image/{imgId}:
 *   get:
 *     summary: Get Image Details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imgId
 *         required: true
 *         description: The ID of the image.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image details retrieved successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: Server error. Failed to retrieve the image details.
 */
router.get('/:imgId', getImageDetails);

/**
 * @swagger
 * /api/image/{imageid}:
 *   delete:
 *     summary: Delete Image
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image deleted successfully.
 *       401:
 *         description: Unauthorized. User is not logged in or token is invalid.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: Server error. Failed to delete the image.
 */
router.delete('/:imgId', authenticate, checkUserStatus, removeImage);

module.exports = router;
