// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/api/v1/users', userRoutes);

// Use error-handling middleware
app.use(errorHandler.notFound);
app.use(errorHandler);

module.exports = app;