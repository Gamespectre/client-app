import nodeJsx from 'node-jsx'
nodeJsx.install()

import ReactDom from 'react-dom/server'
import React from 'react'
import express from 'express'
import Router from 'react-router'

import routes from './routes'

const app = express()

app.get('/*', (req, res) => {
    Router.run(routes, req.url, Handler => {
        let content = ReactDom.renderToString(<Handler />)
        res.send(`<!DOCTYPE html>${content}`)
    })
})

const server = app.listen(8080, () => {
    let host = server.address().address
    let port = server.address().port

    console.log('Server listening at http://%s:%s', host, port)
})