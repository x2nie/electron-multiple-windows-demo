var electron = require('electron')
var Menu = electron.Menu
var app = electron.app
var menu = require('./main/menu')
var windows = require('./main/windows')

app.on('ready', function () {
  Menu.setApplicationMenu(menu)
  windows.create()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (windows.list.length === 0) windows.create()
})
