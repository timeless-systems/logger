'use strict'

const { transports } = require('winston')
const winston = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')

function build (configList = []) {
  const result = []
  if (configList.length === 0) {
    result.push(genConsoleTransport({}))
  } else {
    for (let i = 0; i < configList.length; i++) {
      const config = configList[i]
      switch (config.type) {
        case 'console':
          result.push(genConsoleTransport(config))
          break;
        case 'http':
            result.push(genHttpTransport(config))
            break;
        case 'file':
          result.push(genFileTransport(config))
          break;
        default:
        console.warn('no valid type configured for transport')
      }
    }
  }
  return result;
}

function genConsoleTransport (config) {
  let {level} = config
  level = level || 'info' 
  return new transports.Console({level})
}

function genHttpTransport (config) {
  let {level, host, port, path} = config
    
  level = level || 'info' 
  host = host || '127.0.0.1'
  port = port || 3001
  path = path || '/winston_log/'

  return new transports.Http({
    level,
    host,
    port,
    path
  })
}

function genFileTransport (config) {
  let {level, filename, maxSize, maxFiles, datePattern} = config
  level = level || 'info' 
  maxSize = maxSize || '200m' 
  maxFiles = maxFiles || 30 
  // if (!fs.existsSync(filename)) {
  //   throw new Error(`${filename} is not valid`);
  // }
  return new winston.transports.DailyRotateFile({
    level,
    filename,
    maxSize,
    maxFiles,
    datePattern
  })
}

module.exports = {
  build
}