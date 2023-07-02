require('dotenv').config();

const appPort = process.env.PORT;
const pgUser = process.env.PGUSER;
const pgHost = process.env.PGHOST;
const pgDatabase = process.env.PGDATABASE;
const pgPassword = process.env.PGPASSWORD;
const pgPort = process.env.PGPORT;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const emailSender = process.env.EMAIL_SENDER;
const emailSenderPassword = process.env.EMAIL_SENDER_PASSWORD;
const variables = {
	appPort,
	pgUser,
	pgHost,
	pgDatabase,
	pgPassword,
	pgPort,
	jwtSecretKey,
	emailSender,
	emailSenderPassword,
};

module.exports = variables;
