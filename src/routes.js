import React from 'react'
import { Route } from 'react-router'

import App from './views/App.jsx'
import Browse from './views/pages/Browse.jsx'
import GameList from './views/components/modules/GameList.jsx'

const routes = (
    <Route component={ App }>
        <Route path="/" component={ Browse }>
            <Route path="games" component={ GameList }></Route>
        </Route>
    </Route>
)

export default routes