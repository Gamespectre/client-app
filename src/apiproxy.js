import httpProxy from 'http-proxy'
import apiconfig from './apiconfig'
import express from 'express'
import cors from 'cors'
import compress from 'compression'

const app = express()

app.use(cors())
app.use(compress())

let api = !__DEV__ ? apiconfig.prod : apiconfig.dev

console.log(api.apiUrl + ':' + api.apiPort)

const proxy = httpProxy.createProxyServer({
    target: api.apiUrl + ':' + api.apiPort
})

proxy.on('proxyRes', (proxyRes, req, res, options) => {
    console.log(proxyRes._headers)
})

app.get('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    proxy.web(req, res)
})

app.listen('9000', () => {
    console.log("GameSpectre APIPROXY listening")
})