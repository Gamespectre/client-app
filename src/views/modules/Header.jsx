import React from 'react'
import Radium from 'radium'
import Nav from '../components/Nav.jsx'
import { header as style } from '../../style/components/header'
import Logo from '../components/Logo.jsx'
import User from './User.jsx'

@Radium
class Header extends React.Component {

    render() {
        return (
            <header style={style.box}>
                <div style={style.left}>
                    <Logo />
                    <Nav />
                </div>
                <div style={style.right}>
                    <User />
                </div>
            </header>
        )
    }
}

export default Header