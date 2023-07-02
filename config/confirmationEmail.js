require('colors');
const nodemailer = require('nodemailer');
const variables = require('./variables');

const sendConfirmationEmail = (emailReceiver) => {
	const emailSender = variables.emailSender;
	const emailPassword = variables.emailSenderPassword;

	const emailSubject = 'Account created successfully';
	const emailBody = `
  Hello,
  Your account is created successfully.
  You can now login to your account: https://instalikedomain/login/
`;

	// Create a transporter using SMTP settings
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: emailSender,
			pass: emailPassword,
		},
	});

	// Construct the email message
	const mailOptions = {
		from: emailSender,
		to: emailReceiver,
		subject: emailSubject,
		text: emailBody,
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error('Error sending email:', error);
		} else {
			console.log('Email sent successfully:', info.response);
		}
	});
};

module.exports = { sendConfirmationEmail };
