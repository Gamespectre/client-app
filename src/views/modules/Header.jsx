import React from 'react'
import Radium from 'radium'
import Nav from '../components/Nav.jsx'
import { header as style } from '../../style/components/header'
import Logo from '../components/Logo.jsx'

@Radium
class Header extends React.Component {

    render() {
        return (
            <header style={style.box}>
                <Logo />
                <Nav />
            </header>
        )
    }
}

export default Header