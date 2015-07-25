import React, { PropTypes } from 'react'
import { adminList as style } from '../../style/components/adminList'
import Radium from 'radium'

@Radium
class AdminGameItem extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        value: PropTypes.number,
        change: PropTypes.func.isRequired
    }

    render() {
        return (
            <li style={ style.listItem }>
                <input
                    style={style.checkbox}
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.checked}
                    value={this.props.id}
                    onChange={this.props.change} />

                <div style={ style.content }>
                    <h4 style={ style.heading }>
                        <img style={ style.videoImg } src={this.props.image} />
                        {`${this.props.type}: ${this.props.name}`}
                    </h4>
                    <p>{this.props.description}</p>
                </div>
            </li>
        )
    }
}

export default AdminGameItem