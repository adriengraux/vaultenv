#! /usr/bin/env node
require('dotenv').config()
const yargs = require('yargs')
const init = require('./commands/init.cjs')
const generateKey = require('./commands/generate-key.cjs')
const encrypt = require('./commands/encrypt.cjs')

// eslint-disable-next-line no-unused-vars
const argv = yargs
  .usage('Usage: dotvault <command>')
  .version()
  .command('init', 'Initializes project', init)
  .command('generate-key', 'Generate a new key vault', generateKey)
  .command('encrypt', 'Encrypt vault section from env file to .vault', encrypt)
  .help('h')
  .demandCommand(1, 'Please specify a command')
  .strict()
  .argv
