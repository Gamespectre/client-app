import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {

    render() {

        return (
            <nav className="main-nav">
                <div>
                    <Link to="/explore" activeClassName="active">Explore</Link>
                </div>
                <div>
                    <Link to="/contribute" activeClassName="active">Contribute</Link>
                </div>
                <div>
                    <Link to="/blog" activeClassName="active">Blog</Link>
                </div>
            </nav>
        )
    }
}

export default Nav