// app.js
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const db = require('./models');

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRoutes);

// Use error-handling middleware
app.use(errorHandler.notFound);
app.use(errorHandler);

// Sync database and create tables
db.sequelize.sync().then(() => {
    console.log('Database synchronized');
});

module.exports = app;