import React from 'react'
import Iso from 'iso'
import alt from './flux'
import Router from 'react-router'
import routes from './routes'
import ES6Promise from "es6-promise"

ES6Promise.polyfill()

Iso.bootstrap((state, meta, container) => {
    alt.bootstrap(state)

    Router.run(routes, Router.HistoryLocation, Root => {
        React.render(<Root />, container)
    })

    if (process.env.NODE_ENV !== 'production') {
        window.React = React // enable debugger
    }
})
