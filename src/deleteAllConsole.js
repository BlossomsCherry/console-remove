const vscode = require('vscode')
const fs = require('fs')
const path = require('path')

// 递归遍历所有vue文件
async function removeConsoleLogsInDirectory(dir) {
  const files = await fs.promises.readdir(dir)
  // 要排除的目录列表
  const excludeDirs = ['.git', 'node_modules', 'uni_modules', 'unpackage']

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = await fs.promises.stat(fullPath)

    if (stat.isDirectory()) {
      // 排除不需要遍历的文件夹
      if (!excludeDirs.includes(file)) {
        await removeConsoleLogsInDirectory(fullPath)
      }
    } else if (stat.isFile() && fullPath.endsWith('.vue')) {
      await removeConsoleLogsInFile(fullPath)
    }
  }
}

// 检查文件是否有console.log
async function hasConsoleLog(filePath) {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8')
    return /console\.log\([^)]*\);?/.test(content)
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error}`)
    return false
  }
}

async function removeConsoleLogsInFile(filePath) {
  const document = await vscode.workspace.openTextDocument(filePath)
  const fullText = document.getText()

  // 先判断该文件是否有console.log
  if (!(await hasConsoleLog(filePath))) {
    return
  }

  // 删除console.log
  const updatedText = fullText.replace(
    /console\.log\(([^()]*(\([^()]*\))*[^()]*)*\);?/gs,
    ''
  )

  const edit = new vscode.WorkspaceEdit()
  const firstLine = document.lineAt(0)
  const lastLine = document.lineAt(document.lineCount - 1)
  const textRange = new vscode.Range(firstLine.range.start, lastLine.range.end)

  edit.replace(document.uri, textRange, updatedText)
  await vscode.workspace.applyEdit(edit)
  // 保存更改
  await document.save()
}

module.exports = vscode.commands.registerCommand(
  'console-remove.removeAllConsoleLogs',
  async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders

    if (!workspaceFolders) {
      vscode.window.showInformationMessage('No workspace found.')
      return
    }

    const workspaceFolder = workspaceFolders[0].uri.fsPath
    await removeConsoleLogsInDirectory(workspaceFolder)
    vscode.window.showInformationMessage('所有console.log已经被删除!')

    // 格式化所有文件
    await vscode.commands.executeCommand('editor.action.formatDocument')
  }
)
