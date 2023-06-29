const { queryUsersList } = require('../models/adminModel');
const asyncHandler = require('express-async-handler');

const getUsersList = asyncHandler(async (req, res) => {
	try {
		const data = await queryUsersList();
		const usersList = data.rows;
		res.status(200).send({
			message: 'success',
			total_users: usersList.length,
			users_list: usersList,
		});
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'An error occured while fetching users list.',
		});
	}
});

module.exports = { getUsersList };
