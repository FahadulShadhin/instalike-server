const { client } = require('../../config/db');
require('colors');

const createUserTable = async () => {
	try {
		const createQuery = `
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        password VARCHAR (255) NOT NULL,
				username VARCHAR (255) UNIQUE NOT NULL,
				email VARCHAR (255) UNIQUE NOT NULL,
				fullname VARCHAR (255),
				phone_no VARCHAR (255),
				profession VARCHAR (255),
				bio TEXT,
				profile_image_url VARCHAR (255),
				status VARCHAR (255) DEFAULT 'active',
				timezone VARCHAR (255) DEFAULT 'UTC',
				created_at TIMESTAMP DEFAULT now(),
				is_admin BOOLEAN DEFAULT false
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
		console.log('users table exists.'.blue);
	}
})();
