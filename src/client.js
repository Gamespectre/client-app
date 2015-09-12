import React from 'react'
import Router from 'react-router'
import routes from './routes'
import ES6Promise from "es6-promise"
import { Resolver } from "react-resolver"
import createBrowserHistory from 'history/lib/createBrowserHistory'

ES6Promise.polyfill()

Resolver.render(
    () => (
        <Router history={ createBrowserHistory() }>
            { routes }
        </Router>
    ),
    document.getElementById('app')
)

if (__DEV__) {
    window.React = React // enable debugger
}