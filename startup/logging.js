const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    //format: winston.format.json(),
    //defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    );
    logger.add(
        new winston.transports.File({ filename: 'logs.log' })
    )
}

module.exports = logger;