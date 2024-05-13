var electron = require('electron')
const { desktopCapturer } = require('electron')
var BrowserWindow = electron.BrowserWindow
var ipcMain = electron.ipcMain
const Screenshot = require('electron-screenshot-app');
var config = require('./config')

var list = []

ipcMain.on('create-window', create)


var win2 = null;
var lastWin = null

// Ketika Anda ingin menangkap screenshot dari window
ipcMain.on('capture', async (event, args) => {
  console.log('receive: capture', args)
  // const screenshot = await Screenshot.capture(lastWin);
  // Sekarang, Anda bisa mengirim screenshot ke window lain atau melakukan apa pun yang Anda inginkan dengan gambar tersebut
  // Misalnya, kirim gambar ke window lain melalui IPC
  desktopCapturer.getSources({ types: ['screen'] })
      .then( sources => {
          // document.getElementById('screenshot-image').src = sources[0].thumbnail.toDataURL() // The image to display the screenshot
          // Lakukan apa pun yang Anda inginkan dengan screenshot
          // Misalnya, tampilkan dalam elemen <img> di window ini
          // const imageElement = document.createElement('img');
          // imageElement.src = sources[0].thumbnail.toDataURL() // The image to display the screenshot;

          // const screenshot = sources[0].thumbnail.toDataURL() //? its work! The image to display the screenshot;
          const screenshot = sources[0].thumbnail.toDataURL() // The image to display the screenshot;
  console.log('captureed', screenshot)
          // document.body.appendChild(imageElement);
          // event.sender.send('captured', screenshot);
          // win2.webContents.send('captured', screenshot);
          // win2.send('captured', screenshot);
          event.returnValue = screenshot;
      })
});

function create () {
  if(!win2){
    win2 = new BrowserWindow({
      title: config.APP_NAME,
      y:50,
      x:500,
      width: 500,
      height: 200,
      acceptFirstMouse: true,
      opacity: 0.6,
  
      // frameless: true,
      frame: false,
      transparent: true, 
      skipTaskbar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    }
    })
    win2.loadURL(config.INDEX)
  }
  var win = new BrowserWindow({
    title: config.APP_NAME,
    y:50,
    x:50,
    width: 500,
    height: 200,
    acceptFirstMouse: true,

    // frameless: true,
    frame: false,
    transparent: true, 
  })
  const i = list.length +1
  lastWin=win;
  // win.setBounds({x:10 * i, y:20*i})

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

  win.on('move', function () {
    // console.log('win.move')
    // if(win.getBounds().x > 1000) {
    //   win.setBounds({x:900})
    // }
    var b = win.getBounds()
    win2.setBounds({x: b.x + b.width})
  })
  win.on('moved', function () {
    console.log('win.moved')
  })
  win.on('will-move', function () {
    console.log('win.wil-move')
  })
}

function destroy (win) {
  var i = list.indexOf(win)
  if (i > -1) list.splice(i, 1)
  win = null
}

module.exports = { list, create, destroy }
