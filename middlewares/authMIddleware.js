const variables = require('../config/variables');
const { queryUserById } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authenticate = asyncHandler(async (req, res, next) => {
	let token;
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(401).send({ message: 'Unauthorized access' });
	}

	try {
		token = authHeader.replace('Bearer ', '');
		const decoded = jwt.verify(token, variables.jwtSecretKey);
		const data = await queryUserById(decoded.id);
		req.user = data.rows;
		next();
	} catch (err) {
		return res.status(401).send({ message: 'Not authorized. Token failed.' });
	}

	if (!token) {
		return res.status(401).send('Not authorized. No token found.');
	}
});
module.exports = { authenticate };
