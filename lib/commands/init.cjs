const configuration = require('../configuration.cjs')
const crypto = require('crypto')
const fs = require('fs')

exports.builder = (yargs) =>
  yargs.option('file', {
    alias: 'f',
    describe: 'Override the default env file',
    type: 'string',
    default: configuration.env.file
  }).argv

exports.handler = async function (argv) {
  const command = argv._[0]

  switch (command) {
    case 'init':
      init(argv)
      break
  }

  process.exit(0)
}

function init (argv) {
  if (fs.existsSync(configuration.file)) {
    console.error('already initialized')
    process.exit(1)
  }

  const iv = crypto.randomBytes(configuration.iv.length).toString(configuration.iv.encoding).slice(0, configuration.iv.length)
  const { key, begin, end, extra } = configuration.pattern
  const configVault = {
    iv,
    envFile: argv.file,
    pattern: { begin, end }
  }
  fs.writeFileSync(configuration.file, JSON.stringify(configVault, null, 2))
  console.info(`${configuration.file} created`)

  const vaultPattern = `${key}\n${begin}\n${end}\n${extra}`
  if (fs.existsSync(argv.file)) {
    fs.appendFileSync(argv.file, vaultPattern)
    console.info(`${argv.file} updated`)
  } else {
    fs.writeFileSync(argv.file, vaultPattern)
    console.info(`${argv.file} created`)
  }
}
