const vscode = require('vscode')

module.exports = vscode.commands.registerCommand(
  'console-remove.removeConsoleLogs',
  async () => {
    const editor = vscode.window.activeTextEditor

    if (editor) {
      const document = editor.document
      const fullText = document.getText()
      const updatedText = fullText.replace(
        /console\.log\(([^()]*(\([^()]*\))*[^()]*)*\);?/gs,
        ''
      )

      const edit = new vscode.WorkspaceEdit()
      const firstLine = document.lineAt(0)
      const lastLine = document.lineAt(document.lineCount - 1)
      const textRange = new vscode.Range(
        firstLine.range.start,
        lastLine.range.end
      )

      edit.replace(document.uri, textRange, updatedText)
      await vscode.workspace.applyEdit(edit)
      await document.save()

      vscode.window.showInformationMessage('所有console.log已经被删除!')
    }
  }
)
