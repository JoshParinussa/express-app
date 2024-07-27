// middlewares/errorHandler.js
const createError = require('http-errors');

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
    });
};

// Handle 404 errors
module.exports.notFound = (req, res, next) => {
    next(createError(404, 'Not Found'));
};