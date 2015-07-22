import React from 'react'
import { user as style } from '../../style/components/user'
import Radium from 'radium'

@Radium
class UserDisplay extends React.Component {

    render() {

        return (
            <div style={ style.userDisplay }>
                <span style={ style.name }>{this.props.name}</span>
                <img style={ style.avatar } src={this.props.avatar} alt={this.props.name} />
            </div>
        )
    }
}

export default UserDisplay