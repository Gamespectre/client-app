import React from 'react'
import Nav from '../components/Nav.jsx'
import { sidebar as style } from '../../style/components/sidebar'
import Logo from '../components/Logo.jsx'

class Sidebar extends React.Component {

    render() {
        return (
            <div style={style.box}>
                <Logo />
                <Nav />
            </div>
        )
    }
}

export default Sidebar