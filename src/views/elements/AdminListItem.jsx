import React, { PropTypes } from 'react'
import { adminList as style } from '../../style/components/adminList'
import Radium from 'radium'

@Radium
class AdminListItem extends React.Component {

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
                        {this.props.type === 'channel' ? <img src={this.props.avatar} /> : ""}
                        {`${this.props.type}: ${this.props.name}`}
                    </h4>
                    {this.props.type !== 'channel' && this.props.type !== 'playlist' ? <img src={this.props.image} /> : ""}
                    {this.props.type !== 'playlist' ? <p>{this.props.description}</p> : ""}
                    {this.props.type === 'playlist'}
                </div>
                {this.getNested()}
            </li>
        )
    }

    getNested(data) {

        return (
            <ul>

            </ul>
        )
    }
}

export default AdminListItem