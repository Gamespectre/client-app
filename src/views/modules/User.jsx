import React from 'react'
import UserService from '../../app/UserService'
import LoginButton from '../elements/LoginButton.jsx'
import UserDisplay from '../components/UserDisplay.jsx'
import { reactiveComponent } from 'mobservable-react'
import app from '../../data/App'
import { resolve } from 'react-resolver'

@resolve('user', props => {
    return UserService.fetchUserData()
})
@reactiveComponent
class User extends React.Component {

    constructor() {
        super()
    }

    requestLogin(e) {
        e.preventDefault()
        UserService.authenticate()
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