module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
        },
        modules: false,
        // 确保类被转换为函数构造函数
        forceAllTransforms: false,
      },
    ],
  ],
  plugins: [
    // 装饰器必须在类转换之前
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'jsx',
        pragmaFrag: 'Fragment',
      },
    ],
  ],
};

