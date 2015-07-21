import React from 'react'
import UserActions from '../../actions/UserActions'

class LoginButton extends React.Component {

    static propTypes = {
        doLogin: React.PropTypes.func.isRequired
    }

    render() {

        return (
            <div>
                <button onClick={this.props.doLogin}>Login</button>
            </div>
        )
    }
}

export default LoginButton