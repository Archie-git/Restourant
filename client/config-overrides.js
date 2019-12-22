const {override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    //实现antd的按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //引入less
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
);