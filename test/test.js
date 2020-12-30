var logger = require('../logger');

// print data every sec
setInterval(function() {
    logger.info('INFO Will be logged in both transports!');
    logger.debug('DEBUG Will be logged in both transports!');
    logger.warn('WARN Will be logged in both transports!');
    logger.verbose('VERBOSE Will be logged in both transports!');
    logger.silly('SILLY Will be logged in both transports!');
}, 5000);
