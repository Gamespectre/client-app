import React from 'react'
import Header from './modules/Header.jsx'
import TokenService from '../app/TokenService'
import Transmit from 'react-transmit'

require('../style/scss/main.scss')

class App extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="app-wrapper">
                <Header />
                { this.props.children }
            </div>
        )
    }
}

export default App