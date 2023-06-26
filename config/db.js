const variables = require('./variables');
const { Client } = require('pg');

const connectDB = async () => {
	try {
		const client = new Client({
			user: variables.pgUser,
			host: variables.pgHost,
			database: variables.pgDatabase,
			password: variables.pgPassword,
			port: variables.pgPort,
		});

		await client.connect();
		console.log('pgdb connected...'.cyan);
		await client.end();
	} catch (error) {
		console.log(`${error.message}`.red);
	}
};

module.exports = connectDB;
