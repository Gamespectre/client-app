import React from 'react'

import { sidebar as style } from '../../../style/components/sidebar'
import Logo from '../Logo.jsx'

class Sidebar extends React.Component {

    render() {
        return (
            <div style={style.box}>
                <Logo />
                <h1>
                    fucking yes!!!!!!
                </h1>
            </div>
        )
    }
}

export default Sidebar