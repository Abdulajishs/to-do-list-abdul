const logger = require('../utils/logger');

function requestLogger(req, res, next) {
    logger.info(`Incomming request:${req.method} ${req.url}`,{headers: req.headers});

    res.on('finish',()=>{
        logger.info(`Response sent: ${res.statusCode}`)
    });

    next()
}

module.exports = requestLogger;