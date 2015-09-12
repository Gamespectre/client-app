import React from 'react'
import { Link } from 'react-router'

class ContentNav extends React.Component {

    render() {

        return (
            <div className="content-nav">
                <Link to="/games" activeClassName="active">Games</Link>
                <Link to="/creators" activeClassName="active">Creators</Link>
                <Link to="/series" activeClassName="active">Series</Link>
                <Link to="/videos" activeClassName="active">Videos</Link>
            </div>
        )
    }
}

export default ContentNav