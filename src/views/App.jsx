import React from 'react'
import Radium from 'radium'
import Header from './modules/Header.jsx'
import { RouteHandler } from 'react-router'
import AuthService from '../app/AuthService'

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
                <Header />
                <div style={style.layout.content}>
                    <RouteHandler />
                </div>
            </div>
        )
    }
}

export default App