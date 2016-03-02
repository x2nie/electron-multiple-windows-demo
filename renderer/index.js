const ipcRenderer = require('electron').ipcRenderer

function createWindow (type) { ipcRenderer.send('create-window', type) }

document.querySelector('#create-window').onclick = createWindow

ipcRenderer.on('id', function (event, ...args) {
  var id = args[0]
  document.querySelector('#win-id').innerHTML = id
})
