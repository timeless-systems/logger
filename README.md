# logger
Wrapper for Winston logger 

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