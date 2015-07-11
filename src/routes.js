import React from 'react'
import { Route } from 'react-router'

import App from './views/App.jsx'
import Browse from './views/pages/Browse.jsx'

const routes = (
    <Route component={ App }>
        <Route path="/" component={ Browse } />
    </Route>
)

export default routes