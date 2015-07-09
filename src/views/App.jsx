import React from 'react'
import Radium from 'radium'
import Sidebar from './components/modules/Sidebar.jsx'
import Browse from './pages/Browse.jsx'

if(process.env.BROWSER) {
    require('../style/scss/main.scss')
}

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
                    {this.props.children || <Browse />}
                </div>
            </div>
        )
    }
}

export default App