document.getElementById('yellow').innerHTML = 'going to require()'
const ipcRenderer = require('electron').ipcRenderer
document.getElementById('yellow').innerHTML = 'its now yellow.id'
document.getElementById('yellow').style.background = 'lime'
const { desktopCapturer } = require('electron')
document.getElementById('yellow').style.background = 'aqua'

// document.body.style.opacity = '0.5'

console.log('index was here!')

function createWindow (type) { ipcRenderer.send('create-window', type) }

document.querySelector('#create-window').addEventListener('click', () => createWindow())

// document.querySelector('#capture').addEventListener('click', (e) => ipcRenderer.send('capture', 'foo'))
document.querySelector('#capture').addEventListener('click', (e) => {
  const capture = ipcRenderer.sendSync('capture', 'foo');
  const imageElement = document.createElement('img');
          imageElement.src = capture;
          document.body.appendChild(imageElement);
})
document.getElementById('capture0').addEventListener('click', () => { // The button which takes the screenshot
  desktopCapturer.getSources({ types: ['screen'] })
      .then( sources => {
          // document.getElementById('screenshot-image').src = sources[0].thumbnail.toDataURL() // The image to display the screenshot
          // Lakukan apa pun yang Anda inginkan dengan screenshot
          // Misalnya, tampilkan dalam elemen <img> di window ini
          const imageElement = document.createElement('img');
          imageElement.src = sources[0].thumbnail.toDataURL() // The image to display the screenshot;
          document.body.appendChild(imageElement);
      })
})

ipcRenderer.on('id', function (event, ...args) {
  var id = args[0]
  document.querySelector('#win-id').innerHTML = id
})

// Ketika menerima screenshot dari window utama
ipcRenderer.on('captured', (event, screenshot) => {
  document.getElementById('yellow').style.background = 'fuchsia'
  // Lakukan apa pun yang Anda inginkan dengan screenshot
  // Misalnya, tampilkan dalam elemen <img> di window ini
  document.getElementById('yellow').innerHTML = screenshot;
  const imageElement = document.createElement('img');
  imageElement.src = screenshot;
  document.body.appendChild(imageElement);
});