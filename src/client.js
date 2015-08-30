import React from 'react'
import Router from 'react-router'
import routes from './routes'
import ES6Promise from "es6-promise"
import { Resolver } from "react-resolver";

ES6Promise.polyfill()

Router.run(routes, Router.HistoryLocation, (Root) => {
    Resolver.render(() => <Root />, document.getElementById('app'))
})

if (__DEV__) {
    window.React = React // enable debugger
}