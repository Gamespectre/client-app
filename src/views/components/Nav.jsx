import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { nav as style } from '../../style/components/nav'

@Radium
class Nav extends React.Component {

    render() {

        return (
            <nav style={ style.wrapper } className="main-nav">
                <div style={ style.listItem }>
                    <Link to="explore">Explore</Link>
                </div>
                <div style={ style.listItem }>
                    <Link to="contribute">Contribute</Link>
                </div>
                <div style={ style.listItem }>
                    <Link to="blog">Blog</Link>
                </div>
            </nav>
        )
    }
}

export default Nav