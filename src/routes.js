import Router from "react-router"
import React from "react"

const { Route, DefaultRoute } = Router

import App from './views/App.jsx!'
import Browse from './views/pages/Browse.jsx!'

const routes = (
    <Route handler={ App } path="/">
        <DefaultRoute name="browse" handler={ Browse } />
    </Route>
)

export default routes