import React from 'react'
import { Link } from 'react-router'

class ContentNav extends React.Component {

    render() {

        return (
            <div className="content-nav">
                <Link to="/explore/games">Games</Link>
                <Link to="/explore/creators">Creators</Link>
                <Link to="/explore/series">Series</Link>
                <Link to="/explore/videos">Videos</Link>
            </div>
        )
    }
}

export default ContentNav