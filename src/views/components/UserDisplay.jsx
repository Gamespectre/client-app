import React from 'react'
import { user as style } from '../../style/components/user'
import Radium from 'radium'
import { ObservingComponent } from 'mobservable'

@Radium
class UserDisplay extends React.Component {

    render() {

        return (
            <div style={ style.userDisplay }>
                <span style={ style.name }>{this.props.user.name}</span>
                <img style={ style.avatar } src={this.props.user.avatar} alt={this.props.user.name} />
            </div>
        )
    }
}

export default ObservingComponent(UserDisplay)