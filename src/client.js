import React from 'react'
import Iso from 'iso'
import alt from './flux'
import { Router } from 'react-router'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import routes from './routes'
const history = new BrowserHistory()

Iso.bootstrap((state, meta, container) => {
    alt.bootstrap(state)

    const element = <Router history={ history } children={routes}/>
    React.render(element, container)

    if (process.env.NODE_ENV !== 'production') {
        window.React = React // enable debugger
        const reactRoot = container

        if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
            console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.')
        }
    }
})
