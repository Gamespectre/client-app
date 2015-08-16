import React from 'react'
import UserActions from '../../actions/UserActions'
import AuthService from '../../app/AuthService'
import UserService from '../../app/UserService'
import LoginButton from '../elements/LoginButton.jsx'
import UserDisplay from '../components/UserDisplay.jsx'
import { reactiveComponent } from 'mobservable'
import app from '../../data/App'

@reactiveComponent
class User extends React.Component {

    constructor() {
        super()
    }

    requestLogin(e) {
        e.preventDefault()
        AuthService.authenticate()
    }

    render() {
        let displayElement = {}
        if(UserService.isnt('anon')) {
            displayElement = <UserDisplay key="userDisplay" user={app.user} />
        }
        else {
            displayElement = <LoginButton key="loginBtn" doLogin={this.requestLogin.bind(this)} />
        }

        return (
            <div className="user-area">
                {displayElement}
            </div>
        )
    }
}

export default User