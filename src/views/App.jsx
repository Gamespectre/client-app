import React from 'react'
import Radium from 'radium'
import Sidebar from './components/modules/Sidebar.jsx!'
import Browse from './pages/Browse.jsx!'
import { RouteHandler } from 'react-router'

import { style } from '../style/components/style'

@Radium
class App extends React.Component {

    render() {
        return (
            <div style={[style.layout.app, style.clear]}>
                <div style={style.layout.sidebar}>
                    <Sidebar />
                </div>
                <div style={style.layout.content}>
                    <RouteHandler />
                </div>
            </div>
        )
    }
}

export default App