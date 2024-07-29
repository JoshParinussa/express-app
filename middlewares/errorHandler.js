// middlewares/errorHandler.js
const createError = require('http-errors');

// All error will pass to below function to construct the error hanlder logic
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
    });
};

// Handle 404 errors for unmatched routes
module.exports.notFound = (req, res, next) => {
    console.log(`404 error encountered: ${req.originalUrl}`);
    next(createError(404, 'The requested endpoint not found'));
};