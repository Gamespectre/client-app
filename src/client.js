import React from 'react'
import Router from 'react-router'
import routes from './routes'
import ES6Promise from "es6-promise"
import { Resolver } from "react-resolver";

ES6Promise.polyfill()

Router.run(routes, Router.HistoryLocation, Root => {
    React.render(<Root />, document.getElementById('app'))
})

if (process.env.NODE_ENV !== 'production') {
    window.React = React // enable debugger
}