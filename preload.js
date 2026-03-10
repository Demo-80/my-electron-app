const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
// 在预处理脚本中暴露一个被称为 ipcRenderer.invoke 的函数来触发该处理程序（handler）
  ping: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
})