import React from 'react'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
import connectToStores from '../../../node_modules/alt/utils/connectToStores'
import Radium from 'radium'
import { user as style } from '../../style/components/user'
import UserService from '../../app/AuthService'
import LoginButton from '../elements/LoginButton.jsx'
import UserDisplay from '../components/UserDisplay.jsx'

@Radium
@connectToStores
class User extends React.Component {

    static getStores() {
        return [UserStore];
    }

    static getPropsFromStores() {
        return UserStore.getState()
    }

    constructor() {
        super()
    }

    requestLogin(e) {
        e.preventDefault()
        UserService.authenticate()
    }

    render() {
        let displayElement = <LoginButton key="loginBtn" doLogin={this.requestLogin.bind(this)} />

        if(this.props.user !== false) {
            if(this.props.user.isnt('anon')) {
                displayElement = <UserDisplay key="userDisplay" {...this.props.user} />
            }
        }

        return (
            <div style={ style.box }>
                {displayElement}
            </div>
        )
    }
}

export default User