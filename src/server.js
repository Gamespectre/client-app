'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import Router from 'react-router'
import httpProxy from 'http-proxy'
import apiconfig from './apiconfig'
import routes from './routes'
import AuthService from './app/TokenService'
import { Resolver } from "react-resolver";
import ServerLocation from "react-router-server-location"

const app = express()

let api = !__DEV__ ? apiconfig.prod : apiconfig.dev

const apiServer = httpProxy.createProxyServer({
    target: api.apiUrl + ':' + api.apiPort
})

app.use(favicon(path.join(process.cwd(), '/favicon.ico')))
app.use(compress())
app.use(express.static('.'))
app.use(express.static('./static'))

app.set('views', path.join(__dirname, '..', '/server/views'))
app.set('view engine', 'jade')

app.disable('x-powered-by')

let webpackStats;

if (process.env.NODE_ENV === 'production') {
    webpackStats = require('../webpack-stats.json');
}

app.use('/api', (req, res) => {
    apiServer.web(req, res)
})

app.get('/*', (req, res) => {

    if (process.env.NODE_ENV === 'development') {
        webpackStats = require('../webpack-stats.json');
        delete require.cache[require.resolve('../webpack-stats.json')];
    }

    Router.run(routes, req.path, (Handler, state) => {

        if (!state.routes.length) {
            return res.redirect("/");
        }

        let content = React.renderToString(<Handler />)

        res.render('index', {
            authToken: AuthService.getToken(),
            content: content,
            css: webpackStats.css,
            script: webpackStats.script[0]
        })
    })
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Gamespectre listening at http://%s:%s', host, port);
});