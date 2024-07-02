# Console Remove

一个用于移除 `.vue` 文件中 `console.log` 语句的 VS Code 插件。

## 功能

- 移除当前打开文件中的 `console.log` 语句。
- 递归扫描项目目录，查找并移除所有 `.vue` 文件中的 `console.log` 语句。
- 支持排除特定目录（例如 `.git` 和 `node_modules`）的扫描。

## 安装

1. 下载并安装 [Visual Studio Code](https://code.visualstudio.com/)。
2. 打开侧边栏的扩展视图，点击扩展图标，或者按 `Ctrl+Shift+X`。
3. 搜索 "Console Remove"，然后点击安装。

## 使用方法

### 删除当前文件中的 `console.log`

1. 在 VS Code 中打开一个文件。
2. 右键单击文件内容区域。
3. 选择 “删除控制台打印” 选项。

### 删除项目中所有 `.vue` 文件中的 `console.log`

1. 在 VS Code 中打开你的项目文件夹。
2. 按 `Ctrl+Shift+P` 打开命令面板。
3. 输入 `remove-all-console` 并选择命令。

## 配置

默认情况下，插件会排除 `.git`、 `node_modules`、`uni_modules`和 `unpackage` 目录的扫描。如果你需要排除其他目录，可以修改代码中的 `excludeDirs` 数组。

## 开发

### 前提条件

- [Node.js](https://nodejs.org/)（包含 npm）
- [TypeScript](https://www.typescriptlang.org/)

### 开始

1. 克隆仓库。
2. 运行 `npm install` 安装依赖。
3. 在 VS Code 中打开项目。
4. 按 `F5` 打开一个新的 VS Code 窗口，并加载扩展。
5. 在 `src` 目录中进行代码修改。
6. 运行 `npm run compile` 编译 TypeScript 文件。

### 发布

1. 更新 `package.json` 中的版本号。
2. 确保所有更改已提交到你的仓库。
3. 运行 `vsce package` 创建 `.vsix` 文件。
4. 使用 `vsce publish` 发布扩展。

## 贡献

欢迎贡献！请提交问题或拉取请求来修复 bug 或请求新功能。
