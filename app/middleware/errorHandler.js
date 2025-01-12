const logger = require("../utils/logger");

function errorHandler(err,req,res,next) {
    logger.error(`Error: ${err.message}`,{stack: err.stack})
    res.status(err.status || 500).send({
        message: err.message || 'An unexpected error occurred. Please try again later.',
    });
}

module.exports = errorHandler;