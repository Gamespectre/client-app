import React from 'react'
import Header from './modules/Header.jsx'
import { RouteHandler } from 'react-router'
import AuthService from '../app/AuthService'

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
                <div>
                    <RouteHandler />
                </div>
            </div>
        )
    }
}

export default App