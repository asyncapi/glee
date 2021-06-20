#!/usr/bin/env node

const path = require('path')
const nodemon = require('nodemon')

const args = process.argv.splice(2)

if (args[0] === 'dev') {
  process.env.NODE_ENV = 'development'
  nodemon({
    script: path.resolve(__dirname, 'start.js'),
    ext: 'js json yml yaml'
  });

  nodemon.on('start', function () {
    // TODO: log something
  }).on('quit', function () {
    process.exit();
  }).on('restart', function (files) {
    // TODO: log something
  });
} else if (args[0] === 'start') {
  require('./start')
} else {
  console.error(`Unknown command ${args[0]}`)
}