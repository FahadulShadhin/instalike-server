const asyncHandler = require('express-async-handler');
const { sendConfirmationEmail } = require('../config/confirmationEmail');
const {
	queryUserByEmail,
	createUser,
	queryUserById,
	updateUser,
	deactivateAccount,
	queryPasswordHash,
	updatePassword,
	queryInterests,
	querySocials,
	addInterest,
	addSocial,
	deleteInterest,
	deleteSocial,
} = require('../models/userModel');
const variables = require('../config/variables');
const { setClauses } = require('../config/setQueryClauses');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

//@description     Register new user
//@route           POST /api/user/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
	try {
		const { username, email, password, confirmPassword, is_admin } = req.body;

		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).send({
				message: 'Please fillup all the required fields.',
			});
		}
		if (password !== confirmPassword) {
			return res.status(400).send({ message: 'Passwords do not match.' });
		}

		try {
			const data = await queryUserByEmail(email);
			const userAlreadyExists = data.rows;

			if (userAlreadyExists.length !== 0) {
				return res.status(400).send({
					message: 'User already exists. No need to register again.',
				});
			} else {
				try {
					await createUser(
						username,
						email,
						md5(password),
						is_admin ? is_admin : false
					);

					// Send a confirmation email when account created.
					sendConfirmationEmail(email);

					return res.status(201).send({
						message: 'User created successfully.',
						data: { username, email },
					});
				} catch (err) {
					return res.status(500).send({
						error: err.message,
						message: 'Unexpected error occured while creating user.',
					});
				}
			}
		} catch (err) {
			return res.status(500).send({
				err: err.message,
				message: 'Unexpected error occured while fetching data.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
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

		if (!email || !password) {
			return res.status(400).send({
				message: 'Please fillup all the required fields.',
			});
		}

		try {
			const data = await queryUserByEmail(email);
			const user = data.rows;

			if (user.length === 0) {
				return res
					.status(400)
					.send({ message: 'User not registered. Please sign up.' });
			} else {
				const pass = user[0].password;
				if (pass !== md5(password)) {
					return res.status(400).send({ message: 'Incorrect password' });
				}
				const token = jwt.sign(
					{ id: user[0].id, email: user[0].email },
					variables.jwtSecretKey,
					{ expiresIn: '30d' }
				);
				return res
					.status(200)
					.send({ message: 'Successfully logged in.', token: token });
			}
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while fetching data.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Get user details
//@route           GET /api/user/:userId
//@access          Protected
const getUserProfile = asyncHandler(async (req, res) => {
	try {
		const authId = req.user[0].id;

		try {
			const userData = await queryUserById(authId);
			const interestsData = await queryInterests(authId);
			const socialsData = await querySocials(authId);
			const user = userData.rows;
			const interests = interestsData.rows;
			const socials = socialsData.rows;

			if (user.length === 0) {
				return res.status(404).send({ message: 'User not found.' });
			}
			res
				.status(200)
				.send({ message: 'Success', data: { user, interests, socials } });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while fetching data.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Update user details
//@route           PUT /api/user/:userId
//@access          Protected
const updateUserProfile = asyncHandler(async (req, res) => {
	try {
		const authId = req.user[0].id;
		const updatedInfo = req.body;
		const newInterest = updatedInfo.add_interest;
		const newSocialLink = updatedInfo.add_social_link;
		const removeInterest = updatedInfo.remove_interest;
		const removeSocialLink = updatedInfo.remove_social_link;
		const clauses = [];
		const values = [];
		let counter = 1;

		for (const key in updatedInfo) {
			if (
				key !== 'add_interest' &&
				key !== 'add_social_link' &&
				key !== 'remove_interest' &&
				key !== 'remove_social_link'
			) {
				setClauses(key, updatedInfo[key], clauses, values, counter);
				counter++;
			}
		}

		await updateUser(clauses, values, counter, authId);
		await addInterest(authId, newInterest);
		await addSocial(authId, newSocialLink);
		await deleteInterest(authId, removeInterest);
		await deleteSocial(authId, removeSocialLink);
		return res.status(200).send({ message: 'User update successful.' });
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

//@description     Change password
//@route           PATCH /api/user/change_password
//@access          Protected
const changePassword = asyncHandler(async (req, res) => {
	try {
		const authId = req.user[0].id;
		const { old_password, new_password } = req.body;

		if (old_password === new_password) {
			res
				.status(400)
				.send({ message: 'New password can not be same as before.' });
		}

		try {
			const data = await queryPasswordHash(authId);
			const userPassHash = data.rows[0].password;

			if (md5(old_password) === userPassHash) {
				await updatePassword(authId, md5(new_password));
				return res.status(200).send({
					message: 'Password changed successfully.',
				});
			} else {
				return res.status(401).send({ message: 'Invalid password.' });
			}
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'An error occured while changing password.',
			});
		}
	} catch (err) {
		return res
			.status(500)
			.send({ error: err.message, message: 'Internal server error.' });
	}
});

//@description     Delete user account
//@route           DELETE /api/user/:userId
//@access          Protected
const deleteAccount = asyncHandler(async (req, res) => {
	try {
		const authId = req.user[0].id;

		try {
			await deactivateAccount(authId);
			return res.status(200).send({ message: 'Account deleted successfully.' });
		} catch (err) {
			return res.status(500).send({
				error: err.message,
				message: 'Unexpected error occured while deleting user.',
			});
		}
	} catch (err) {
		return res.status(500).send({
			error: err.message,
			message: 'Internal server error.',
		});
	}
});

module.exports = {
	registerUser,
	authenticateUser,
	getUserProfile,
	updateUserProfile,
	deleteAccount,
	changePassword,
};
