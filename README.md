
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/ekoeryanto/module-igniter.svg?branch=master)](https://travis-ci.org/ekoeryanto/module-igniter)
[![Build status](https://ci.appveyor.com/api/projects/status/7p8m8vy0w14lah2i?svg=true)](https://ci.appveyor.com/project/nueko/module-igniter)
[![Codecov](https://img.shields.io/codecov/c/github/ekoeryanto/module-igniter.svg)](https://codecov.io/gh/ekoeryanto/module-igniter)

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

## Usage

### No Argument Passed

```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug('commonjs', 'node-resolve')
// or plug(['commonjs', 'node-resolve'])
// return [require('rollup-plugin-commonjs')(), require('rollup-plugin-node-resolve')()]
```

### With Argument Passed

```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)})
// return [require('rollup-plugin-replace')({'process.env.NODE_ENV': JSON.stringify(environment)})]
```

### Optional Environment (Last Boolean Parameter)
```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
const plugins = plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)}, false)
// return []
```

# License
MIT
