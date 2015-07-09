'use strict'

delete process.env.BROWSER;

import nodeJsx from 'node-jsx'
nodeJsx.install()

import fs from 'fs'
import path from 'path'

import objectAssign from 'object-assign'
import compress from 'compression'
import React from 'react'
import express from 'express'
import Router from 'react-router'
import Location from 'react-router/lib/Location'

import routes from '../routes'

const app = express()

app.set('views', './src/server/views')
app.set('view engine', 'jade')

//app.use(compress)
app.use('src', express.static(path.join(process.cwd(), '/src')))

app.disable('x-powered-by')

var env = {
    production: process.env.NODE_ENV === 'production'
}

if (env.production) {
    objectAssign(env, {
        assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
    });
}

app.get('/*', (req, res) => {
    var location = new Location(req.path, req.query)

    Router.run(routes, location, (error, initialState, transition) => {
        let content = React.renderToString(<Router {...initialState} />)
        res.render('index', {content: content, env: env})
    })
})

var port = Number(process.env.PORT || 8080);
app.listen(port, function () {
    console.log(`server running at localhost:${port}`);
});

if (env.production === false) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var webpackConfig = require('../../webpack.dev.config');

    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: '/src/',
        contentBase: './src/',
        inline: true,
        hot: true,
        stats: false,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        }
    }).listen(8081, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }

        console.log('webpack dev server listening on localhost:3000');
    });
}