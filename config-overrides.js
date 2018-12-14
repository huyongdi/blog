//实现antd按需加载--来源antd官网
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
      ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}], // change importing css to less
      config,
  );
//  config = rewireLess.withLoaderOptions({ //定制主题
//    modifyVars: {"@primary-color": "#1890ff"},
//    javascriptEnabled: true,
//  })(config, env);
  return config;
};