const variables = require('./variables');
const asyncHandler = require('express-async-handler');
const { Client } = require('pg');

const client = new Client({
	user: variables.pgUser,
	host: variables.pgHost,
	database: variables.pgDatabase,
	password: variables.pgPassword,
	port: variables.pgPort,
});

const connectDB = asyncHandler(async () => {
	try {
		await client.connect();
		console.log('pgdb connected...'.cyan);
	} catch (error) {
		console.log(`${error.message}`.red);
	}
});

module.exports = { client, connectDB };
