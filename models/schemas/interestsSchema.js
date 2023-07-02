const { client } = require('../../config/db');
require('colors');

const createInterestsTable = async () => {
	try {
		const createQuery = `
      CREATE TABLE interests (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        interest VARCHAR (255)
      );
    `;
		await client.query(createQuery);
		console.log('Successfully created interests table'.green);
	} catch (err) {
		console.log('Error occured while creating interests table.'.red);
	}
};

const checkInterestsTableExists = async () => {
	try {
		const checkQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'interests'
      );
    `;

		const res = await client.query(checkQuery);
		return res.rows[0].exists;
	} catch (err) {
		console.log('Error occured while checking interests table.'.red);
	}
};

(async () => {
	const usersExists = await checkInterestsTableExists();
	if (!usersExists) {
		await createInterestsTable();
	} else {
		console.log('interests table exists.'.blue);
	}
})();
