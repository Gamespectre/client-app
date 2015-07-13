import React from 'react'
import Radium from 'radium'
import Sidebar from './modules/Sidebar.jsx'
import Browse from './pages/Browse.jsx'

if(__CLIENT__) {
    require('../style/scss/main.scss')
}

import { style } from '../style/components/style'

@Radium
class App extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="app-wrapper" style={style.layout.app}>
                <div className="sidebar-wrapper" style={style.layout.sidebar}>
                    <Sidebar />
                </div>
                <div className="content-wrapper" style={style.layout.content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App