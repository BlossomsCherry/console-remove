const vscode = require('vscode')
const progress = require('./progress.js')
const deleteAllConsole = require('./deleteAllConsole.js')
const deleteConsole = require('./deleteConsole.js')

function activate(context) {
  vscode.window.showInformationMessage('插件成功激活!')
  context.subscriptions.push(progress)
  context.subscriptions.push(deleteAllConsole)
  context.subscriptions.push(deleteConsole)
}

module.exports = {
  activate
}
