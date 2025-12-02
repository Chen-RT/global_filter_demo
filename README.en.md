# Global Filter Demo

English | [中文](README.md)

A global filter demonstration project.

## Project Overview

This project demonstrates how to create custom components. It includes a `DemoPane` component and corresponding `DemoPaneModel` data model, showcasing how to use custom components in a dashboard environment.

## Tech Stack

- **Build Tool**: Rollup
- **Transpiler**: Babel
- **Package Manager**: pnpm

## Installation

```bash
pnpm install
```

## Build

```bash
pnpm run build
```

After building, the output files will be in the `package/dist/` directory:

- `index.js` - CommonJS format (Node.js environment)
- `index.esm.js` - ES Module format (modern browsers/build tools)
- `index.browser.js` - IIFE format (direct browser use)

## Usage

### Method 1: Using in Browser DevTools Snippets (Recommended)

1. **Open Browser DevTools**
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
   - Firefox: Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)

2. **Open Snippets Panel**
   - In DevTools, click the `Sources` tab
   - In the left panel, find and expand the `Snippets` option
   - If you don't see Snippets, click the `>>` icon in the left panel and select `Snippets`

3. **Create a New Snippet**
   - Click the `+ New snippet` button
   - Name your snippet (e.g., `global-filter-demo`)

4. **Add Code**
   - Open the `package/dist/index.browser.js` file
   - Copy all contents of the file
   - Paste into the newly created snippet

5. **Run the Snippet**
   - In the dashboard page, right-click the snippet name
   - Select `Run` or press `Ctrl+Enter` (Windows/Linux) / `Cmd+Enter` (Mac)

6. **Use in Dashboard Environment**
   ```javascript
   // Code is already loaded via snippet, you can use it directly
   var pane = new GlobalFilterDemo.DemoPane();
   var model = new GlobalFilterDemo.DemoPaneModel();
   
   // Or without new (wrapper function handles it automatically)
   var pane2 = GlobalFilterDemo.DemoPane();
   var model2 = GlobalFilterDemo.DemoPaneModel();
   ```

### Method 2: Using as npm Package

```javascript
// CommonJS
const { DemoPane, DemoPaneModel } = require('global_filter_demo');

// ES Module
import { DemoPane, DemoPaneModel } from 'global_filter_demo';
```

### Method 3: Direct Use in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Global Filter Demo</title>
</head>
<body>
  <script src="package/dist/index.browser.js"></script>
  <script>
    // Use components
    var pane = new GlobalFilterDemo.DemoPane();
    var model = new GlobalFilterDemo.DemoPaneModel();
  </script>
</body>
</html>
```

## Project Structure

```
global_filter_demo/
├── package/
│   ├── src/
│   │   └── index.js          # Source code
│   └── dist/                 # Build output
│       ├── index.js           # CommonJS format
│       ├── index.esm.js       # ES Module format
│       └── index.browser.js   # Browser format (IIFE)
├── babel.config.js            # Babel configuration
├── rollup.config.js           # Rollup configuration
└── package.json               # Project configuration
```

## Development

### Source Code Location

Source code is located in `package/src/index.js`, containing:

- `DemoPane`: Custom panel component
- `DemoPaneModel`: Data model class

### Rebuild After Code Changes

```bash
pnpm run build
```

## Notes

1. **Browser Compatibility**: `index.browser.js` uses modern JavaScript features, recommended for modern browsers
2. **Runtime Environment**: This project requires a dashboard environment with the global `BI` object available
3. **Variable Conflicts**: Build tools automatically handle `top` variable conflicts in browsers
4. **Class Transformation**: ES6 classes are automatically converted to function constructors for framework compatibility
