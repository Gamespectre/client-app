import React from 'react'
import Radium from 'radium'
import Nav from '../components/Nav.jsx'
import Logo from '../components/Logo.jsx'
import User from './User.jsx'

@Radium
class Header extends React.Component {

    render() {
        return (
            <header className="site-header">
                <div className="left-content">
                    <Logo />
                    <Nav />
                </div>
                <div className="right-content">
                    <User />
                </div>
            </header>
        )
    }
}

export default Header