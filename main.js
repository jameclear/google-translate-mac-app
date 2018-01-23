const { app, BrowserWindow, shell, Menu } = require('electron')
const url = require('url')
const createDefaultMenuOptions = require('electron-default-menu')

let win

function createWindow() {
  const menuOptions = createDefaultMenuOptions(app, shell)
  const menu = Menu.buildFromTemplate(menuOptions)
  Menu.setApplicationMenu(menu)

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