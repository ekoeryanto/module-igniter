[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Codecov](https://img.shields.io/codecov/c/github/ekoeryanto/module-igniter/master.svg)](https://codecov.io/gh/ekoeryanto/module-igniter)
[![Build Status](https://travis-ci.org/ekoeryanto/module-igniter.svg?branch=master)](https://travis-ci.org/ekoeryanto/module-igniter)
[![Build status](https://ci.appveyor.com/api/projects/status/7p8m8vy0w14lah2i/branch/master?svg=true)](https://ci.appveyor.com/project/ekoeryanto/module-igniter/branch/master)
[![CircleCI](https://circleci.com/gh/ekoeryanto/module-igniter/tree/master.svg?style=shield)](https://circleci.com/gh/ekoeryanto/module-igniter/tree/master)

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

### Without Argument

```js
const igniter = require("module-igniter");
const plug = igniter({ prefix: "rollup-plugin-" });
plug("commonjs", "node-resolve");
// or plug(['commonjs', 'node-resolve'])
// result [require('rollup-plugin-commonjs')(), require('rollup-plugin-node-resolve')()]
```

### With Single Argument

```js
const igniter = require("module-igniter");
const plug = igniter({prefix: 'rollup-plugin-'})

// single array argument
plug({ foo: [["hello"]] });
// result [require('foo')(['hello])]
plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)})
// result [require('rollup-plugin-replace')({'process.env.NODE_ENV': JSON.stringify(environment)})]
```

### With multiple Arguments

```js
const igniter = require("module-igniter");
const plug = igniter();

// single array argument
plug({ foo: [["hello"], { bar: "baz" }] });
// result [require('foo')(['hello], {bar: 'baz'})]
```

### Optional Environment (Last Boolean Parameter)

```js
const igniter = require('module-igniter')
const plug = igniter({prefix: 'rollup-plugin-'})
plug({replace: {'process.env.NODE_ENV': JSON.stringify(environment)}, false)
// result []
```

### Class Based Plugin (Webpack)

```js
const igniter = require("module-igniter");
const plug = igniter({ classic: true });
plug({
  "html-webpack-plugin": {
    filename: "assets/admin.html"
  }
});
// result [new require('html-webpack-plugin')({filename: 'assets/admin.html'})]
```

## Example

See [here](https://github.com/ekoeryanto/netlify-cms-widget-starter-rollup/blob/89ad4bdd4460076beb6adc182c35d683897a1607/rollup.config.js) for real usage example

## License

MIT
