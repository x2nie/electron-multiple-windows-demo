var electron = require('electron')
var BrowserWindow = electron.BrowserWindow
var ipcMain = electron.ipcMain
var config = require('./config')

var list = []

ipcMain.on('create-window', create)

function create () {
  var win = new BrowserWindow({
    title: config.APP_NAME,
    width: 500,
    height: 200,
    acceptFirstMouse: true
  })

  win.loadURL(config.INDEX)
  win.setTitle(`${config.APP_NAME} - Window ${win.id}`)
  list.push(win)

  if (config.DEBUG) win.webContents.openDevTools()

  win.webContents.on('did-finish-load', function () {
    win.webContents.send('id', win.id)
  })

  win.on('closed', function () {
    destroy(win)
  })
}

function destroy (win) {
  var i = list.indexOf(win)
  if (i > -1) list.splice(i, 1)
  win = null
}

module.exports = { list, create, destroy }
