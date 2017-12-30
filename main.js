const { app, BrowserWindow } = require('electron')
const url = require('url')

let win

function createWindow() {
  const options = {
    width: 1024,
    height: 768,
    show: false
  };

  win = new BrowserWindow(options)

  win.loadURL(url.format({
    pathname: 'translate.google.com',
    protocol: 'https:',
    slashes: true
  }))

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})