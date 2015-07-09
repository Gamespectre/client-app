import React from 'react'
window.React = React;

import Router from 'react-router'
import routes from './routes'
import BrowserHistory from 'react-router/lib/BrowserHistory'

React.render(
    <Router history={ BrowserHistory } children={ routes } />,
    document.getElementById('app')
)