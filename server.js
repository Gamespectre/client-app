'use strict'

import path from 'path'
import compress from 'compression'
import React from 'react'
import express from 'express'
import favicon from 'serve-favicon'
import Router from 'react-router'
import routes from './src/routes'

import index from './server/views/index.jade!'

const app = express()

app.use(favicon(path.join(process.cwd(), '/client/img/favicon.ico')))
//app.use(compress())
app.use(express.static('.'))

app.disable('x-powered-by')

app.get('/*', (req, res) => {

    Router.run(routes, req.path, (Root, state) => {
        const content = React.renderToString(<Root />)
        res.send(index({content: content}))
    })
})

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});