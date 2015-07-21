import React from 'react'
import { user as style } from '../../style/components/user'
import Radium from 'radium'

@Radium
class UserDisplay extends React.Component {

    render() {

        return (
            <div style={ style.userDisplay }>
                <img style={ style.avatar } src={this.props.avatar} alt={this.props.name} />
                <span style={ style.name }>{this.props.name}</span>
            </div>
        )
    }
}

export default UserDisplay