/**
 * @author Artur Brito
 * @email artur.brito95@gmail.com
 * @create date 07-07-2020 00:33:03
 * @modify date 07-07-2020 00:33:03
 * @desc Logging configuration
 */

const winston = require('winston');

//-- Create logger
const logger = winston.createLogger({
    level: 'info',
    //format: winston.format.json(),
    //defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
    // Uncaught Exceptions
    //exceptionHandlers: [
        //new winston.transports.File({ filename: 'exceptions.log' }),
        //new winston.transports.Console()
    //]
});

// Uncaught Promises
/*process.on('unhandledRejection', (ex) => {
    throw ex;
});*/


// Logger for dev
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console(
            {
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            }
        )
    );

    logger.add(
        new winston.transports.File({ filename: 'logs.log' })
    )
}

module.exports = logger;