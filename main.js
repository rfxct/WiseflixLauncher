const { app, BrowserWindow } = require('electron')
const { Client } = require('discord-rpc')
const client = new Client({ transport: 'ipc' })

const { updateActivity, isWatching, setupWindow } = require('./functions')
const { URL } = require('./constants')
const path = require('path')

client.on('ready', () => updateActivity(client))
app.on('ready', () => {
  createWindow()
  client.login({ clientId: '851894855072350258' })
})

let mainWindow
let preLoadFullscreen = false
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Wiseflix',
    webPreferences: {
      nodeIntegration: true
    }
  })
  setupWindow(mainWindow)

  mainWindow.loadURL(`file://${path.join(__dirname, 'static', 'index.html')}`)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('page-title-updated', (_event, title) => {
    const url = mainWindow.webContents.getURL()
    if (url.startsWith('http') && !preLoadFullscreen) {
      preLoadFullscreen = true
      mainWindow.maximize()
    }

    const watching = isWatching(url)
    const description = watching ? title.replace(/^(Wiseflix (-|\|))|(-|\|) Wiseflix$/ig, '').trim() : 'Navegando...'
    const label = watching ? 'Assistir à este título' : 'Acessar Wiseflix'

    updateActivity(client, {
      details: `${watching ? '🎬' : '🔍'} ${description}`,
      buttons: [{ label, url }]
    })
  })
}

app.on('window-all-closed', app.quit)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
