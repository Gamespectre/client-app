import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './views/App.jsx'
import Blog from './views/pages/Blog.jsx'
import Front from './views/pages/Front.jsx'
import Explore from './views/pages/Explore.jsx'
import Admin from './views/pages/admin/Admin.jsx'
import GameList from './views/modules/GameList.jsx'
import GamePage from './views/modules/GamePage.jsx'
import Contribute from './views/pages/Contribute.jsx'
import VideoList from './views/modules/VideoList.jsx'
import SeriesList from './views/modules/SeriesList.jsx'
import CreatorList from './views/modules/CreatorList.jsx'
import ResourceHub from './views/modules/ResourceHub.jsx'
import AdminControl from './views/modules/admin/AdminControl.jsx'
import GamePackageList from './views/components/admin/GamePackageList.jsx'
import GameQueryControl from './views/components/admin/GameQueryControl.jsx'
import YoutubePackageList from './views/components/admin/YoutubePackageList.jsx'
import YoutubeQueryControl from './views/components/admin/YoutubeQueryControl.jsx'

const routes = (
    <Route component={ App }>
        <Route path="/" component={ Front } />
        <Route path="/explore" components={ Explore }>
            <Route path="/games" component={ GameList } />
            <Route path="/games/:game" component={ GamePage } />
            <Route path="/series" component={ SeriesList } />
            <Route path="/creators" component={ CreatorList } />
            <Route path="/videos" component={ VideoList } />
        </Route>

        <Route path="blog" component={ Blog } />
        <Route path="contribute" component={ Contribute } />
        <Route path="/admin" component={ Admin }>
            <Route path="content" component={ AdminControl }>
                <Route path="game" components={{ control: GameQueryControl, results: GamePackageList }} />
                <Route path="youtube" components={{ control: YoutubeQueryControl, results: YoutubePackageList }} />
            </Route>
        </Route>
    </Route>
)

export default routes