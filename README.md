
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://img.shields.io/circleci/project/github/ekoeryanto/module-igniter.svg)](https://circleci.com/gh/ekoeryanto/module-igniter)

# NodeJS Module Igniter 
Automatic call nodejs module, originally created for load rollup-plugins.

## Install

### Using NPM

```bash
npm i module-igniter
```
### Using Yarn
```bash
yarn add module-igniter
```

# Usage

### No Argument Passed

```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug('commonjs', 'node-resolve')
// or plug(['commonjs', 'node-resolve'])
// return array of called rollup-plugin-commonjs and rollup-plugin-node-resolve
```

### With Argument Passed

```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)})
// return array of called rollup-plugin-replace({'process.env.NODE_ENV': JSON.stringify(environment)})
```

### Optional Environment
```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)}, false)
// return empty array
```

# License
MIT
