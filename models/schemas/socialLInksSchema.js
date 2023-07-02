const { client } = require('../../config/db');
require('colors');

const createSocialsTable = async () => {
	try {
		const createQuery = `
      CREATE TABLE socials (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        social_link VARCHAR (255)
      );
    `;
		await client.query(createQuery);
		console.log('Successfully created socials table'.green);
	} catch (err) {
		console.log('Error occured while creating socials table.'.red);
	}
};

const checkSocialsTableExists = async () => {
	try {
		const checkQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'socials'
      );
    `;

		const res = await client.query(checkQuery);
		return res.rows[0].exists;
	} catch (err) {
		console.log('Error occured while checking socials table.'.red);
	}
};

(async () => {
	const usersExists = await checkSocialsTableExists();
	if (!usersExists) {
		await createSocialsTable();
	} else {
		console.log('socials table exists.'.blue);
	}
})();
