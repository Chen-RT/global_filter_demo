const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');

// 插件：替换浏览器中冲突的变量名
function replaceBrowserConflicts() {
  return {
    name: 'replace-browser-conflicts',
    renderChunk(code, chunk, options) {
      // 只在浏览器版本中替换
      if (options.format === 'iife') {
        // 替换变量声明：var/let/const top = 为 _top =
        code = code.replace(/\b(var|let|const)\s+top\s*=/g, '$1 _top =');
        
        // 替换赋值语句：top = 为 _top = (但要避免 window.top = 等)
        // 匹配：行首或分号/大括号后的 top =，但不是 .top =
        code = code.replace(/([^.\w])\btop\s*=/g, '$1_top =');
        
        // 替换变量引用，但要避免替换属性访问（如 window.top, elem.top）
        // 匹配独立的 top 变量（不是属性访问）
        code = code.replace(/\btop\s*(===|==|!==|!=|&&|\|\||;|\)|,|}|:|\?)/g, '_top$1');
        code = code.replace(/([^.\w])\btop\s*([,;\)\}])/g, '$1_top$2');
        code = code.replace(/([^.\w])\btop\s*(\?|:)/g, '$1_top$2');
        
        // 包装类导出，使其可以在没有 new 的情况下调用
        // 匹配 exports.ClassName = ClassName; 的模式，并添加包装函数
        code = code.replace(
          /exports\.(\w+)\s*=\s*(\1);/g,
          (match, className, classRef) => {
            return `exports.${className} = (function() {
              var WrappedClass = ${classRef};
              // 创建一个工厂函数，自动处理 new
              function Wrapper() {
                // 使用 Reflect.construct 来正确调用类构造函数（推荐方式）
                if (typeof Reflect !== 'undefined' && Reflect.construct) {
                  return Reflect.construct(WrappedClass, arguments, WrappedClass);
                }
                // 降级方案：通过 Function 构造函数动态创建 new 调用
                var args = Array.prototype.slice.call(arguments);
                // 构建参数列表字符串
                var paramList = [];
                for (var i = 0; i < args.length; i++) {
                  paramList.push('args[' + i + ']');
                }
                // 使用 Function 构造函数创建 new 调用
                try {
                  var factory = new Function('WrappedClass', 'args', 
                    'return new WrappedClass(' + paramList.join(',') + ');'
                  );
                  return factory(WrappedClass, args);
                } catch(e) {
                  // 如果 Function 构造函数失败，尝试直接调用（可能会失败，但至少不会静默失败）
                  throw new Error('Cannot instantiate ' + className + ' without new. Please use: new GlobalFilterDemo.' + className + '()');
                }
              }
              // 复制原型链
              Wrapper.prototype = WrappedClass.prototype;
              // 复制静态属性和方法
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(Wrapper, WrappedClass);
              }
              Object.getOwnPropertyNames(WrappedClass).forEach(function(name) {
                if (name !== 'prototype' && name !== 'length' && name !== 'name' && name !== 'caller' && name !== 'arguments') {
                  try {
                    var desc = Object.getOwnPropertyDescriptor(WrappedClass, name);
                    if (desc) {
                      Object.defineProperty(Wrapper, name, desc);
                    } else {
                      Wrapper[name] = WrappedClass[name];
                    }
                  } catch(e) {}
                }
              });
              return Wrapper;
            })();`;
          }
        );
      }
      return { code, map: null };
    }
  };
}

module.exports = {
  input: 'package/src/index.js',
  output: [
    {
      file: 'package/dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'package/dist/index.esm.js',
      format: 'es',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'package/dist/index.browser.js',
      format: 'iife',
      name: 'GlobalFilterDemo',
      sourcemap: true,
      inlineDynamicImports: true,
      globals: {},
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
    }),
    resolve({
      preferBuiltins: false,
      browser: false,
    }),
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
    }),
    replaceBrowserConflicts(),
  ],
};

