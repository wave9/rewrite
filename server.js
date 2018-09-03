const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

const moduleName = argv["name"];
const port = 10023;
const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};
config.entry[moduleName] = path.resolve(__dirname, `package/${moduleName}/index.js`);
config.mode = 'development';
// 配置html-webpack-plugin
config.plugins.push(
    new HtmlWebpackPlugin({
        template: `templates/${moduleName}/index.html`
    })
);

// 配置自动打开浏览器
config.plugins.push(
    new OpenBrowserWebpackPlugin({
        url: `http://localhost:${port}`
    })
);

WebpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(port, 'localhost', ()=> {
    console.log(`dev server is running at port ${port}`);
});