# logger
Wrapper for Winston logger 

## Usage

``` javascript
const { Logger } = require('@timeless-systems/logger')
const logger = new Logger({
  transports: [{
      type: 'console',
      level: 'info'
    }, {
      type: 'file',
      level: 'info',
      filename: './logs/output.log'
  }]
})
```

## Logger([config])`

```
- `config` (optional, *Object*) - If not provided, defaults to basic config
  - `config.transports` (optional, *Array*) - contains different transport config object, the default value is console config
    - `console transport config` (optional, *Object*) - console config object of config.transports
      - `type` (necessary, *String*) - console/file
      - `level` (optional, *String*) - The default value is 'info'
    - `file transport config` (optional, *Object*) - file config object of config.transports
      - `type` (necessary, *String*) - console/file
      - `level` (optional, *String*) - The default value is 'info'
      - `filename` (optional, *String*)
      - `datePattern` (optional, *String*) - The default value is 'YYYY-MM-DD', please refer to [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file#options)
      - `maxSize` (optional, *String*) - The default value is '200m', please refer to [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file#options)
      - `maxFiles` (optional, *Number*) - The default file is 30, please refer to [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file#options)
```

## ENV Variables to activate different transports

```
const logConsole = process.env.LOG_CONSOLE || 'true';
const logFile = process.env.LOG_FILE || 'true';
const logHttp = process.env.LOG_HTTP || 'true';
const logFile_error = process.env.LOG_FILE_ERROR || 'true';
```

## levels

```
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
```
## npm

### .npmrc

create a file ~.npmrc and replace ${NPM_AUTH_TOKEN} with a private GITHUB token with private repo read access 

```
engine-strict=true
registry=https://npm.pkg.github.com/timeless-systems
@timeless-systems:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}
```

### install

```
npm install @timeless-systems/logger@0.0.11
```

or 

```
npm install @timeless-systems/logger

```

## Development

in workspace of logger:

```
npm link
```

in the workspace where it should be consumed:

```
npm link @timeless-systems/logger
```