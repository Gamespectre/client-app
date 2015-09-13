'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import { RoutingContext, match } from 'react-router'
import httpProxy from 'http-proxy'
import apiconfig from './apiconfig'
import routes from './routes'
import TokenService from './app/TokenService'
import { Resolver } from "react-resolver"
import PrettyError from 'pretty-error'
import createLocation from 'history/lib/createLocation'
import { renderToString } from 'react-dom/server'
import Html from './Html'
import config from './config'

const pretty = new PrettyError()
const app = express()

let api = !__DEV__ ? apiconfig.prod : apiconfig.dev

const apiServer = httpProxy.createProxyServer({
    target: api.apiUrl + ':' + api.apiPort
})

if(__DEV__) {
    const wpConfig = require('../webpack/dev.config')
    const compiler = require('webpack')(wpConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: wpConfig.output.publicPath
    }))
    app.use(require('webpack-hot-middleware')(compiler))
}

app.use(compress())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(express.static(__dirname + '/static'))

app.disable('x-powered-by')

app.use('/api', (req, res) => {
    apiServer.web(req, res)
})

apiServer.on('error', (error, req, res) => {
    console.log('proxy error', error);
    let json = { error: 'proxy_error', reason: error.message };
    res.status(500).json(JSON.stringify(json));
});

app.get('/*', (req, res) => {

    let location = createLocation(req.url)

    if (__DEV__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    if (__DISABLE_SSR__) {
        res.send('<!doctype html>\n' +
            renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} resolverData={{}}/>))
    } else {
        match({ routes, location }, (error, redirectLocation, renderProps) => {
            if (redirectLocation)
                res.status(301).redirect(redirectLocation.pathname + redirectLocation.search)
            else if (error)
                res.status(500).send(error.message)
            else if (renderProps == null)
                res.status(404).send('Not found')
            else
                Resolver
                    .resolve(() => <RoutingContext {...renderProps}/>)
                    .then(({ Resolved, data }) => {
                        res.status(200).send(createResponse(Resolved, data))
                    })
                    .catch((error) => {
                        res.status(200).send(createResponse(RoutingContext, {}))
                    })
        })
    }
})

function createResponse(Resolved, data) {
    return '<!doctype html>\n' + renderToString(<Html assets={webpackIsomorphicTools.assets()} component={ <Resolved /> } resolverData={data}/>)
}

if (config.port) {
    app.listen(config.port, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.info('==> ✅  Server is listening')
            console.info('==> 🌎  %s running on port %s, API on port %s', config.app.name, config.port, config.apiPort)
            console.info('----------\n==> 💻  Open http://localhost:%s in a browser to view the app.', config.port)
        }
    })
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified')
}