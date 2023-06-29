const { client } = require('../../config/db');
require('colors');

const createImagesTable = async () => {
	try {
		const createQuery = `
      CREATE TABLE images (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (id),
        filepath VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT now()
      );
    `;
		await client.query(createQuery);
		console.log('Successfully created images table'.green);
	} catch (err) {
		console.log('Error occured while creating images table.'.red);
	}
};

const checkImagesTableExists = async () => {
	try {
		const checkQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'images'
      );
    `;

		const res = await client.query(checkQuery);
		return res.rows[0].exists;
	} catch (err) {
		console.log('Error occured while checking images table.'.red);
	}
};

(async () => {
	const usersExists = await checkImagesTableExists();
	if (!usersExists) {
		await createImagesTable();
	} else {
		console.log('< images > table exists.'.blue);
	}
})();
