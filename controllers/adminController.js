const { queryUsersList, editStatus } = require('../models/adminModel');
const asyncHandler = require('express-async-handler');

//@description     Get users list
//@route           GET /api/admin
//@access          Protected
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

//@description     Edit user status
//@route           PATCH /api/admin/:userId
//@access          Protected
const editUserStatus = asyncHandler(async (req, res) => {
	try {
		const id = req.params.userId;
		const { new_status } = req.body;

		try {
			await editStatus(id, new_status);
			return res.status(200).send({ message: 'Status edited successfully.' });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'An error occured while editing user status.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

module.exports = { getUsersList, editUserStatus };
