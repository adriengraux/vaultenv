module.exports = {
  env: {
    file: '.env',
    encoding: 'utf8'
  },
  cipher: {
    algorithm: 'aes-256-cbc'
  },
  iv: {
    length: 16,
    encoding: 'hex'
  },
  key: {
    type: 'aes',
    encoding: 'hex',
    length: 32,
    options: {
      length: 256
    }
  },
  file: 'config.vault',
  vault: { encoding: 'hex', file: '.vault' },
  pattern: {
    key: 'DOTVAULT_KEY=PLACE YOUR KEY HERE',
    begin: '// BEGIN VAULT',
    end: '// END VAULT',
    extra: '###--------------------------------------------------------------------------------###\n' +
      '###------------------------------- CUSTOM ENV VARS --------------------------------###\n' +
      '###--------------------------------------------------------------------------------###'
  }
}
