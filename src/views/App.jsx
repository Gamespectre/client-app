import React from 'react'
import Header from './modules/Header.jsx'
import { RouteHandler } from 'react-router'
import TokenService from '../app/TokenService'
import Transmit from 'react-transmit'

if(__CLIENT__) {
    require('../style/scss/main.scss')
}

class App extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="app-wrapper">
                <Header />
                <RouteHandler />
            </div>
        )
    }
}

export default App