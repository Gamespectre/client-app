'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import Router from 'react-router'
import Iso from 'iso'
import httpProxy from 'http-proxy'
import apiconfig from './apiconfig'
import alt from './flux'
import routes from './routes'
import Location from 'react-router/lib/Location';

const app = express()

let api = process.env.NODE_ENV === 'production' ? apiconfig.prod : apiconfig.dev

const apiServer = httpProxy.createProxyServer({
    target: api.apiUrl + ':' + api.apiPort
})

app.use(favicon(path.join(process.cwd(), '/favicon.ico')))
app.use(compress())
app.use(express.static('.'))

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
    const location = new Location(req.path, req.query)
    alt.bootstrap(JSON.stringify(res.locals.data || {}))

    const iso = new Iso()

    if (process.env.NODE_ENV === 'development') {
        webpackStats = require('../webpack-stats.json');
        delete require.cache[require.resolve('../webpack-stats.json')];
    }

    Router.run(routes, location, (error, state) => {

        let content = React.renderToString(
            <Router location={location} {...state} />
        )

        iso.add(content, alt.flush())

        res.render('index', {
            content: iso.render(),
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