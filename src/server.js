'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import Router from 'react-router'
import routes from './routes'
import Location from 'react-router/lib/Location';

const app = express()

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

app.get('/*', (req, res) => {
    const location = new Location(req.path, req.query)

    if (process.env.NODE_ENV === 'development') {
        webpackStats = require('../webpack-stats.json');
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        delete require.cache[require.resolve('../webpack-stats.json')];
    }

    Router.run(routes, location, (error, state) => {
        res.render('index', {
            content: React.renderToString(
                <Router location={location} {...state} />
            ),
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