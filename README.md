# Global Filter Demo

[English](README.en.md) | 中文

一个全局过滤器演示项目。

## 项目简介

本项目演示了如何创建自定义组件。项目包含了一个 `DemoPane` 组件和对应的 `DemoPaneModel` 数据模型，展示了如何在仪表板环境中使用自定义组件。

## 技术栈

- **构建工具**: Rollup
- **转译工具**: Babel
- **包管理器**: pnpm

## 安装依赖

```bash
pnpm install
```

## 构建项目

```bash
pnpm run build
```

构建完成后，产物将输出到 `package/dist/` 目录：

- `index.js` - CommonJS 格式（Node.js 环境）
- `index.esm.js` - ES Module 格式（现代浏览器/构建工具）
- `index.browser.js` - IIFE 格式（浏览器直接使用）

## 使用方式

### 方式一：在浏览器 DevTools Snippets 中使用（推荐）

1. **打开浏览器 DevTools**
   - Chrome/Edge: 按 `F12` 或 `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
   - Firefox: 按 `F12` 或 `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)

2. **打开 Snippets 面板**
   - 在 DevTools 中，点击 `Sources` 标签
   - 在左侧面板中找到并展开 `Snippets` 选项
   - 如果没有看到 Snippets，点击左侧面板的 `>>` 图标，选择 `Snippets`

3. **创建新的 Snippet**
   - 点击 `+ New snippet` 按钮
   - 给 snippet 命名（例如：`global-filter-demo`）

4. **添加代码**
   - 打开 `package/dist/index.browser.js` 文件
   - 复制文件中的所有内容
   - 粘贴到新创建的 snippet 中

5. **运行 Snippet**
   - 在仪表板页面中，右键点击 snippet 名称
   - 选择 `Run` 或直接按 `Ctrl+Enter` (Windows/Linux) / `Cmd+Enter` (Mac)

6. **在仪表板环境中使用**
   ```javascript
   // 代码已经通过 snippet 加载，可以直接使用
   var pane = new GlobalFilterDemo.DemoPane();
   var model = new GlobalFilterDemo.DemoPaneModel();
   
   // 或者不使用 new（包装函数会自动处理）
   var pane2 = GlobalFilterDemo.DemoPane();
   var model2 = GlobalFilterDemo.DemoPaneModel();
   ```

### 方式二：作为 npm 包使用

```javascript
// CommonJS
const { DemoPane, DemoPaneModel } = require('global_filter_demo');

// ES Module
import { DemoPane, DemoPaneModel } from 'global_filter_demo';
```

### 方式三：直接在 HTML 中使用

```html
<!DOCTYPE html>
<html>
<head>
  <title>Global Filter Demo</title>
</head>
<body>
  <script src="package/dist/index.browser.js"></script>
  <script>
    // 使用组件
    var pane = new GlobalFilterDemo.DemoPane();
    var model = new GlobalFilterDemo.DemoPaneModel();
  </script>
</body>
</html>
```

## 项目结构

```
global_filter_demo/
├── package/
│   ├── src/
│   │   └── index.js          # 源代码
│   └── dist/                  # 构建产物
│       ├── index.js           # CommonJS 格式
│       ├── index.esm.js       # ES Module 格式
│       └── index.browser.js   # 浏览器格式（IIFE）
├── babel.config.js            # Babel 配置
├── rollup.config.js           # Rollup 配置
└── package.json               # 项目配置
```

## 开发说明

### 源代码位置

源代码位于 `package/src/index.js`，包含：

- `DemoPane`: 自定义面板组件
- `DemoPaneModel`: 数据模型类

### 修改代码后重新构建

```bash
pnpm run build
```

## 注意事项

1. **浏览器兼容性**: `index.browser.js` 使用了现代 JavaScript 特性，建议在现代浏览器中使用
2. **运行环境**: 本项目需要在包含 `BI` 全局对象的仪表板环境中运行
3. **变量冲突**: 构建工具已自动处理了浏览器中的 `top` 变量冲突问题
4. **类转换**: ES6 类已自动转换为函数构造函数，兼容框架的使用方式

