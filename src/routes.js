import { Route } from "react-router"
import React from "react"

import App from './views/App.jsx'
import Browse from './views/pages/Browse.jsx'

const routes = (
    <Route component={ App } path="/">
        <Route path="browse" component={ Browse } />
    </Route>
)

export default routes