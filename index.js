const { app, BrowserWindow, ipcMain } = require("electron/main");
// 进程间通信 (IPC)
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      //__dirname 字符串指向当前正在执行的脚本的路径(在本例中，它指向你的项目的根文件夹)。
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile("index.html");
  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  // 使用 ipcMain.handle 设置一个主进程处理程序（handler）
  ipcMain.handle('ping', () => 'pong')
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
