import React from 'react'
import { Route } from 'react-router'

import App from './views/App.jsx'
import Browse from './views/pages/Browse.jsx'
import Admin from './views/pages/admin/Admin.jsx'
import GameList from 'views/modules/GameList.jsx'
import GameControl from 'views/modules/admin/GameControl.jsx'

const routes = (
    <Route component={ App }>
        <Route path="/" component={ Browse }>
            <Route path="games" component={ GameList }></Route>
            <Route path="admin" component={ Admin }>
                <Route path="game" component={ GameControl }></Route>
            </Route>
        </Route>
    </Route>
)

export default routes