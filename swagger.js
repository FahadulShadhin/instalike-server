const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('./package.json');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Insta-like API Docs',
			version,
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: [
		'./routes/userRoutes.js',
		'./routes/imageRoutes.js',
		'./routes/adminRoutes.js',
	],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('docs.json', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});
	console.log(`App running at PORT: ${port}`);
}

module.exports = { swaggerDocs };
