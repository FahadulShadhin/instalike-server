require('colors');
const variables = require('./variables');
const { spawn } = require('child_process');

const sendConfirmationEmail = (emailReceiver) => {
	const pythonScriptPath = variables.pythonScriptPath;
	const emailSender = variables.emailSender;
	const emailSenderPassword = variables.emailSenderPassword;

	try {
		const pythonProcess = spawn(variables.pythonExecuteCommand, [
			pythonScriptPath,
			emailSender,
			emailSenderPassword,
			emailReceiver,
		]);

		pythonProcess.on('error', (err) => {
			console.error(`Error executing Python script: ${err}`.red);
		});

		pythonProcess.on('close', (code) => {
			if (code === 0) {
				console.log(`Confirmation email sent successfully!`.green);
			} else {
				console.error(
					`Python script execution failed with exit code: ${code}`.red
				);
			}
		});
	} catch (err) {
		console.error(`Failed to execute Python script: ${err}`.red);
	}
};

module.exports = { sendConfirmationEmail };
