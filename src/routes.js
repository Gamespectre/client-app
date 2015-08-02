import React from 'react'
import { Route, Redirect, NotFoundRoute } from 'react-router'

import App from './views/App.jsx'
import Explore from './views/pages/Explore.jsx'
import Blog from './views/pages/Blog.jsx'
import Contribute from './views/pages/Contribute.jsx'
import Front from './views/pages/Front.jsx'
import Admin from './views/pages/admin/Admin.jsx'
import GameList from 'views/modules/GameList.jsx'
import VideoList from 'views/modules/VideoList.jsx'
import ModalPage from 'views/modules/ModalPage.jsx'
import SeriesList from 'views/modules/SeriesList.jsx'
import CreatorList from 'views/modules/CreatorList.jsx'
import GameControl from 'views/modules/admin/GameControl.jsx'
import ContentControl from 'views/modules/admin/ContentControl.jsx'

const routes = (
    <Route handler={ App }>
        <Route name="front" path="/" handler={ Front } />
        <Route name="explore" path="explore" handler={ Explore }>
            <Route name="games" path="games" handler={ GameList }>
                <Route name="gamepage" path=":game" handler={ ModalPage } />
            </Route>
            <Route name="series" path="series" handler={ SeriesList } />
            <Route name="creators" path="creators" handler={ CreatorList } />
            <Route name="videos" path="videos" handler={ VideoList } />
        </Route>
        <Route name="blog" path="blog" handler={ Blog } />
        <Route name="contribute" path="contribute" handler={ Contribute } />
        <Route name="admin" path="admin" handler={ Admin }>
            <Route name="adminGame" path="game" handler={ GameControl } />
            <Route name="adminContent" path="content" handler={ ContentControl } />
        </Route>
        <NotFoundRoute handler={ Front } />
    </Route>
)

export default routes