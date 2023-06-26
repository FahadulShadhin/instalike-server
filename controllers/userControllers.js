const asyncHandler = require('express-async-handler');
const { queryUserByEmail, createUser } = require('../models/userModel');
const variables = require('../config/variables');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({
				message: 'Please fillup all the required fields.',
			});
		}
		try {
			const userAlreadyExists = await queryUserByEmail(email);
			if (userAlreadyExists.length !== 0) {
				return res
					.status(400)
					.send({ message: 'User already exists. No need to register again.' });
			} else {
				try {
					const user = {
						username,
						email,
						password: md5(password),
					};
					await createUser(user.username, user.email, user.password);
					return res.status(201).send({
						message: 'User created successfully.',
						data: { username: username, email: email },
					});
				} catch (err) {
					return res
						.status(500)
						.send({ message: 'Unexpected error occured while creating user.' });
				}
			}
		} catch (err) {
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while fetching data.' });
		}
	} catch (err) {
		return res.status(500).send({
			message: 'Internal server error.',
		});
	}
});

//@description     Authenticate the user
//@route           POST /api/user/login
//@access          Public
const authenticateUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		try {
			const data = await queryUserByEmail(email);
			const user = data.rows;

			if (user.length === 0) {
				return res
					.status(400)
					.send({ message: 'User not registered. Please sign up.' });
			} else {
				if (user[0].password !== md5(password)) {
					return res.status(400).send({ message: 'Incorrect password' });
				}
				const token = jwt.sign(
					{ id: user[0].id, email: user[0].email },
					variables.jwtSecretKey
				);
				return res
					.status(200)
					.send({ message: 'Successfully logged in.', token: token });
			}
		} catch (err) {
			return res
				.status(500)
				.send({ message: 'Unexpected error occured while fetching data.' });
		}
	} catch (err) {
		return res.status(500).send({
			message: 'Internal server error.',
		});
	}
});

const userProfile = asyncHandler(async (req, res) => {
	console.log('user profile');
});

module.exports = { registerUser, authenticateUser, userProfile };
