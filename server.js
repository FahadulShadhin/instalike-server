require('colors');
const express = require('express');
const { connectDB } = require('./config/db');
const variables = require('./config/variables');
const userRoutes = require('./routes/userRoutes');

connectDB();
const app = express();
const PORT = variables.appPort || 3000;
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/user', userRoutes);

app.listen(PORT, () =>
	console.log(`>>> Server started at PORT ${PORT}`.yellow.underline)
);
