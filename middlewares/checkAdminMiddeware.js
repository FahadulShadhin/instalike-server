const asyncHandler = require('express-async-handler');
const { queryAdminStatus } = require('../models/userModel');

const checkAdminStatus = asyncHandler(async (req, res, next) => {
	const user = req.user;
	const data = await queryAdminStatus(user[0].id);
	const isAdmin = data.rows[0].is_admin;
	if (isAdmin) {
		next();
	} else {
		res.status(401).send({ message: 'Only for admin access.' });
	}
});
module.exports = { checkAdminStatus };
