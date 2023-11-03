const { app, BrowserWindow } = require('electron')
const path = require('path')
const remote = require('@electron/remote/main')
remote.initialize()

const NODE_ENV = process.env.NODE_ENV
let win
/**
 * @Description: electron程序入口
 * @Author: Etc.End
 * @Copyright: TigerSong
 * @CreationDate 2023-05-20 14:39:26
 */
const createWindow = () => {
  win = new BrowserWindow({
    icon: './public/logo.png',
    frame: false, // 去掉导航最大化最小化以及关闭按钮
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    center: true,
    skipTaskbar: false,
    transparent: false,
    webPreferences: {
      contextIsolation: false,
      webSecurity: false
    }
  })
  // win.loadURL('http://localhost:5173/')
  // win.webContents.openDevTools()
  win.loadURL(
    NODE_ENV === 'development' ? 'http://localhost:9527/' : `file://${path.join(__dirname, '../dist/index.html')}`
  )
  if (NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
  remote.enable(win.webContents)
}
app.whenReady().then(() => {
  createWindow()
})
/**
 * @Description: 限制只能打开一个页面
 * @CreationDate 2023-05-20 14:35:52
 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
