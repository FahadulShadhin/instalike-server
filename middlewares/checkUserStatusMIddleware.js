const asyncHandler = require('express-async-handler');
const { queryUesrStatus } = require('../models/userModel');

const checkUserStatus = asyncHandler(async (req, res, next) => {
	const authId = req.user[0].id;
	const data = await queryUesrStatus(authId);
	const userStatus = data.rows[0].status.toLowerCase();

	if (userStatus === 'deactivated') {
		return res.status(401).send({
			message:
				'Your account is deactivated. Please register or activate your account.',
		});
	} else if (userStatus === 'blocked' || userStatus === 'suspended') {
		return res.status(401).send({
			message: 'Your account is blocked/suspended!',
		});
	} else {
		next();
	}
});

module.exports = { checkUserStatus };
