// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/v1/users', userRoutes);

// Error handler for unexist routes
app.use(errorHandler.notFound);
// Error handler to throw the error to user
app.use(errorHandler);

module.exports = app;