const express = require('express');
const { getUsersList } = require('../controllers/adminController');
const { authenticate } = require('../middlewares/authMIddleware');
const { checkAdminStatus } = require('../middlewares/checkAdminMiddeware');

const router = express.Router();

router.get('/', authenticate, checkAdminStatus, getUsersList);

module.exports = router;
