'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import DocumentMeta from 'react-document-meta'
import express from 'express'
import favicon from 'serve-favicon'
import Router from 'react-router'
import httpProxy from 'http-proxy'
import apiconfig from './apiconfig'
import routes from './routes'
import TokenService from './app/TokenService'
import { Resolver } from "react-resolver"
import PrettyError from 'pretty-error'
import Html from './Html'
import config from './config'
import ServerLocation from "react-router-server-location"

const pretty = new PrettyError()
const app = express()

let api = !__DEV__ ? apiconfig.prod : apiconfig.dev

const apiServer = httpProxy.createProxyServer({
    target: api.apiUrl + ':' + api.apiPort
})

app.use(compress())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(require('serve-static')(path.join(__dirname, '..', 'static')))

app.disable('x-powered-by')

app.use('/api', (req, res) => {
    apiServer.web(req, res)
})

apiServer.on('error', (error, req, res) => {
    let json;
    console.log('proxy error', error);
    if (!res.headersSent) {
        res.writeHead(500, {'content-type': 'application/json'});
    }

    json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
});

app.get('/*', (req, res) => {

    const location = new ServerLocation(req, res)

    if (__DEV__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }

    if (__DISABLE_SSR__) {
        res.send('<!doctype html>\n' +
            React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} resolverData={{}}/>))
    } else {
        Router.run(routes, location, (Handler, state) => {

            if (!state.routes.length) {
                return res.redirect("/");
            }

            Resolver.resolve(() => <Handler {...state} />)
            .then(({ Resolved, data }) => {
                res.send('<!doctype html>\n' +
                    React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={ <Resolved /> } resolverData={data}/>))
            })
            .catch((error) => {
                if (error.redirect) {
                    res.redirect(error.redirect)
                    return
                }
                console.error('ROUTER ERROR:', pretty.render(error))
                res.status(500).send({error: error.stack})
            })
        })
    }
})

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