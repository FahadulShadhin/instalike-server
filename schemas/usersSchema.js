const { client } = require('../config/db');
require('colors');

const createUserTable = async () => {
	try {
		const createQuery = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        password VARCHAR (255),
        basic_info JSONB,
        interest JSONB,
        account_info JSONB DEFAULT jsonb_build_object('created_at', now()::text, 'timezone', 'America/New_York', 'status', 'Active')
      );
    `;
		await client.query(createQuery);
		console.log('Successfully created users table'.green);
	} catch (err) {
		console.log('Error occured while creating users table.'.red);
	}
};

const checkUserTableExists = async () => {
	try {
		const checkQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'users'
      );
    `;

		const res = await client.query(checkQuery);
		return res.rows[0].exists;
	} catch (err) {
		console.log('Error occured while checking users table.'.red);
	}
};

(async () => {
	const usersExists = await checkUserTableExists();
	if (!usersExists) {
		await createUserTable();
	} else {
		console.log('< users > table exists.'.blue);
	}
})();
