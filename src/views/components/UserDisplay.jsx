import React from 'react'
import { reactiveComponent } from 'mobservable'

class UserDisplay extends React.Component {

    render() {

        return (
            <div className="user-display">
                <span className="name">{this.props.user.name}</span>
                <img className="avatar" src={this.props.user.avatar} alt={this.props.user.name} />
            </div>
        )
    }
}

export default reactiveComponent(UserDisplay)