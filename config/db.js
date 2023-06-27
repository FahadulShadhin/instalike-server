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
		console.log(
			`>>> PostgreSQL connected at PORT ${variables.pgPort}`.cyan.underline
		);
	} catch (err) {
		console.log(`Error: ${err.message}`.red);
	}
});

module.exports = { client, connectDB };
