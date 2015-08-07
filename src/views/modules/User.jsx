import React from 'react'
import UserActions from '../../actions/UserActions'
import Radium from 'radium'
import { user as style } from '../../style/components/user'
import AuthService from '../../app/AuthService'
import UserService from '../../app/UserService'
import LoginButton from '../elements/LoginButton.jsx'
import UserDisplay from '../components/UserDisplay.jsx'
import { ObservingComponent } from 'mobservable'
import app from '../../data/App'

@Radium
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
            <div style={ style.box }>
                {displayElement}
            </div>
        )
    }
}

export default ObservingComponent(User)