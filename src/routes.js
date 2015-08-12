import React from 'react'
import { Route, Redirect, NotFoundRoute, DefaultRoute } from 'react-router'
import App from './views/App.jsx'
import Explore from './views/pages/Explore.jsx'
import Blog from './views/pages/Blog.jsx'
import Contribute from './views/pages/Contribute.jsx'
import Front from './views/pages/Front.jsx'
import Admin from './views/pages/admin/Admin.jsx'
import GameList from './views/modules/GameList.jsx'
import GamePage from './views/modules/GamePage.jsx'
import VideoList from './views/modules/VideoList.jsx'
import SeriesList from './views/modules/SeriesList.jsx'
import CreatorList from './views/modules/CreatorList.jsx'
import ResourceHub from './views/modules/ResourceHub.jsx'
import AdminControl from './views/modules/admin/AdminControl.jsx'

const routes = (
    <Route handler={ App }>
        <Route name="front" path="/" handler={ Front } />
        <Route name="explore" path="explore" handler={ Explore }>
            <Route name="games" path="games" handler={ ResourceHub }>
                <DefaultRoute handler={ GameList } />
                <Route name="gamepage" path=":game" handler={ GamePage } />
            </Route>
            <Route name="series" path="series" handler={ ResourceHub }>
                <DefaultRoute handler={ SeriesList } />
            </Route>
            <Route name="creators" path="creators" handler={ ResourceHub }>
                <DefaultRoute handler={ CreatorList } />
            </Route>
            <Route name="videos" path="videos" handler={ ResourceHub }>
                <DefaultRoute handler={ VideoList } />
            </Route>
        </Route>
        <Route name="blog" path="blog" handler={ Blog } />
        <Route name="contribute" path="contribute" handler={ Contribute } />
        <Route name="admin" path="admin" handler={ Admin }>
            <Route name="adminGame" path=":resource" handler={ AdminControl } />
        </Route>
        <NotFoundRoute handler={ Front } />
    </Route>
)

export default routes