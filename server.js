require('colors');
const express = require('express');
const { client, connectDB } = require('./config/db');
const variables = require('./config/variables');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { swaggerDocs } = require('./swagger');
require('./models/schemas/usersSchema');
require('./models/schemas/imagesSchema');
require('./models/schemas/socialLInksSchema');
require('./models/schemas/interestsSchema');

connectDB();
const app = express();
const PORT = variables.appPort || 3000;
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
	console.log(`>>> Server started at PORT ${PORT}`.yellow.underline);
	swaggerDocs(app, PORT);
});

process.on('SIGINT', () => {
	console.log('Server stopped!'.red);
	client.end();
});
