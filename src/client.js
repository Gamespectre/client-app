import React from 'react'
import Router from 'react-router'
import routes from './routes'
import ES6Promise from "es6-promise"
import { Resolver } from "react-resolver";
import { history } from "react-router/lib/BrowserHistory"

ES6Promise.polyfill()

Resolver.render(
    () => <Router history={ history } children={ routes } />,
    document.getElementById('app')
)

if (__DEV__) {
    window.React = React // enable debugger
}