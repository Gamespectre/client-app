import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {

    render() {

        return (
            <nav className="main-nav">
                <div>
                    <Link to="/explore">Explore</Link>
                </div>
                <div>
                    <Link to="/contribute">Contribute</Link>
                </div>
                <div>
                    <Link to="/blog">Blog</Link>
                </div>
            </nav>
        )
    }
}

export default Nav