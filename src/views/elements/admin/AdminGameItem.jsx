import React, { PropTypes } from 'react'
import { adminList as style } from '../../../style/components/adminList'
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
                    <img style={ style.image } src={this.props.image} />
                    <h4 style={ style.heading }>
                        {`${this.props.type}: ${this.props.name}`}
                    </h4>
                    <p>{this.props.description}</p>
                    <p>{this.props.year}</p>
                </div>
            </li>
        )
    }
}

export default AdminGameItem