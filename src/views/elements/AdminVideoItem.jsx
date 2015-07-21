import React, { PropTypes } from 'react'
import { adminList as style } from '../../style/components/adminList'
import Radium from 'radium'

@Radium
class AdminVideoItem extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        value: PropTypes.number
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
                    disabled={this.props.disabled || false} />

                <div style={ style.content }>
                    <h4>
                        <img style={ style.videoImg } src={this.props.image} />
                        {this.props.name}
                    </h4>
                    <span>
                        id: {this.props.id}<br />
                        published: {this.props.published}<br />
                        order: {this.props.order}
                    </span>
                </div>
            </li>
        )
    }
}

export default AdminVideoItem