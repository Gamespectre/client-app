import React from 'react'
import Header from './modules/Header.jsx'
import TokenService from '../app/TokenService'
import UserService from '../app/UserService'
import { resolve } from 'react-resolver'

require('../style/scss/main.scss')

class App extends React.Component {

    constructor() {
        super()

        this.startInitialFetches()
    }

    startInitialFetches() {
        TokenService.token().then((token) => {
            UserService.fetchUserData(token)
        })
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