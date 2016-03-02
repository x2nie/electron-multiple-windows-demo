var path = require('path')
var argv = require('minimist')(process.argv.slice(2))

module.exports = {
  APP_NAME: 'Electron Multiple Windows Demo',
  INDEX: 'file://' + path.resolve(__dirname, '..', 'renderer', 'index.html'),
  DEBUG: argv.debug
}
