import * as winston from 'winston';


const convertToMsg = winston.format((info, _opts) => {
    info.msg = info.message;
    delete info.message;
    return info;
});

let options = {
    level: 'silly',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        convertToMsg(),
        winston.format.json(),
    )
}

const loggerProduction = winston.createLogger(options);
const loggerDevelopment = winston.createLogger(options);

loggerProduction.add(new winston.transports.Console());
loggerDevelopment.add(new winston.transports.Console());

if (process.env.NODE_ENV === 'production') {
    loggerDevelopment.transports[0].silent = true
}

export {
    loggerProduction,
    loggerDevelopment
};
