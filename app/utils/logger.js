const { createLogger, format, transports } = require('winston');


const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info', // Default log level
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json() // Logs in JSON format for structured data
    ),
    defaultMeta: { service: 'todo-app' }, // Add metadata
    transports: [
        // Console transport
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        // File transport for logs
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
    ],
    exceptionHandlers: [
        // Handle uncaught exceptions
        new transports.File({ filename: 'logs/exceptions.log' }),
    ],
    rejectionHandlers: [
        // Handle unhandled promise rejections
        new transports.File({ filename: 'logs/rejections.log' }),
    ],
});

// If we're not in production, log to the console with a simpler format
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new transports.Console({
//         format: format.combine(
//             format.colorize(),
//             format.simple()
//         )
//     }));
// }

module.exports = logger;
