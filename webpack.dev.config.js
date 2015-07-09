'use strict';

var webpack = require('webpack');
var config = require('./webpack.base.config.js');

if (process.env.NODE_ENV !== 'test') {
    config.entry = [
        'webpack-dev-server/src?http://localhost:3000',
        'webpack/hot/dev-server',
        config.entry
    ];
}

config.devtool = 'eval-source-map';

config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
]);

config.module.loaders = config.module.loaders.concat([
    {test: /\.(jsx|js)?$/, loaders: [ 'react-hot', 'babel?optional=runtime'], exclude: /node_modules/}
]);

module.exports = config;