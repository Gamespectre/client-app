import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { navStyle as style } from '../../style/components/navStyle'

@Radium
class Nav extends React.Component {

    render() {

        return (
            <ul style={ style.list }>
                <li>
                    <Link to="/admin">Admin</Link>
                    <ul>
                        <li><Link to="/admin/game">Games</Link></li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default Nav