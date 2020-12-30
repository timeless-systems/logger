var winston = require("winston");
const _ = require("lodash");
const fs = require('fs');
const path = require('path');
const { format } = require("winston");

var defaultOptions = {
  console: {
    colorize: true,
    handleExceptions: true,
    json: false,
    level: "info"
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

function reload_config(file) {
  if (!(this instanceof reload_config))
    return new reload_config(file);
  var self = this;

  self.path = path.resolve(file);
  
  fs.watchFile(file, function (curr, prev) {
    try {
      const data = fs.readFileSync('./config/logger.json', 'utf8')
      // create objects
      var config = JSON.parse(data)
    } catch (err) {
      console.error(err)
    }

    transports.console.level = config.console.level;
    transports.file.level = config.file.level;

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

var data = reload_config("./config/logger.json");

const transports = {
  console: new winston.transports.Console(defaultOptions.console),
  file: new winston.transports.File(defaultOptions.file)
};

var logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    transports.console,
    transports.file
  ]
});

module.exports = logger;
