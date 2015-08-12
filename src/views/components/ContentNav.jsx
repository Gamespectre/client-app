import React from 'react'
import { Link } from 'react-router'

class ContentNav extends React.Component {

    render() {

        return (
            <div className="content-nav">
                <Link to="games">Games</Link>
                <Link to="creators">Creators</Link>
                <Link to="series">Series</Link>
                <Link to="videos">Videos</Link>
            </div>
        )
    }
}

export default ContentNav