var winston = require("winston");
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const { format } = require("winston");
const rTracer = require('cls-rtracer');

const rTracerFormat = format.printf((info) => {
    const rid = rTracer.id()
    return rid
      ? `${info.timestamp} [request-id:${rid}]: ${info.level} ${info.message}`
      : `${info.timestamp}: ${info.level} ${info.message}`
  })

var defaultOptions = {
    console: {
        colorize: true,
        handleExceptions: true,
        json: false,
        level: "info"
    },
    file_error: {
        colorize: false,
        filename: `./logs/error.log`,
        handleExceptions: true,
        json: true,
        level: "error",
        maxFiles: 5,
        maxsize: 5242880 // 5MB
    },
    file: {
        colorize: false,
        filename: `./logs/app.log`,
        handleExceptions: true,
        json: true,
        level: "info",
        maxFiles: 5,
        maxsize: 5242880 // 5MB
    }
};

async function pre() {
    console.log('Executing main');

    const dir = './config';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }

    if (fs.existsSync(dir)) {
        const jsonString = JSON.stringify(defaultOptions, null, 2)
        fs.writeFileSync(`${dir}/logger.json`, jsonString)
        var data = reload_config(`${dir}/logger.json`);
    }
}

function reload_config(file) {
    if (!(this instanceof reload_config))
        return new reload_config(file);
    var self = this;

    self.path = path.resolve(file);

    fs.watch(file, function (curr, prev) {
        try {
            const data = fs.readFileSync('./config/logger.json', 'utf8')
            // create objects
            var config = JSON.parse(data)
        } catch (err) {
            console.error(err)
        }

        transports.console.level = config.console.level;
        transports.file.level = config.file.level;
        transports.file_error.level = config.file_error.level;

        logger.info('INFO Will be logged in both transports!');
        logger.debug('DEBUG Will be logged in both transports!');
        logger.warn('WARN Will be logged in both transports!');
        logger.silly('SILLY Will be logged in both transports!');
        logger.verbose('VERBOSE Will be logged in both transports!');

        delete require.cache[self.path];
        _.extend(self, require(file));
    });

    _.extend(self, require(file));
}

pre().catch((e) => {
    console.error(e)
})

const transports = {
    console: new winston.transports.Console(defaultOptions.console),
    file: new winston.transports.File(defaultOptions.file),
    file_error: new winston.transports.File(defaultOptions.file_error)
};

var logger = winston.createLogger({
    defaultMeta: { service: 'user-service' },
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        rTracerFormat
    ),
    transports: [
        transports.console,
        transports.file,
        transports.file_error
    ]
});

module.exports = logger;


/*
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log', level: 'error',
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: 'combined.log', level: 'debug',
      format: winston.format.printf(info => `${new Date().toISOString(), ${info.message}`),
    }),
  ],
});

logger.error('prefixed by the timestamp only in `combined.log`');
*/