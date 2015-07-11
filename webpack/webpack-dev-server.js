var host = process.env.HOST || '0.0.0.0',
    port = parseInt(process.env.PORT) + 1 || 3001

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./dev.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
}).listen(port, host, function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3000');
});