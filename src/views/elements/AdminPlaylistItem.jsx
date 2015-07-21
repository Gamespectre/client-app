import React, { PropTypes } from 'react'
import AdminVideoItem from './AdminVideoItem.jsx'
import { adminList as style } from '../../style/components/adminList'
import Radium from 'radium'

@Radium
class AdminPlaylistItem extends React.Component {

    render() {
        return (
            <div style={ style.listItem }>
                <input
                    style={style.checkbox}
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.checked}
                    value={this.props.id}
                    onChange={this.props.change}
                    disabled={this.props.disabled || false} />

                <div style={ style.content }>
                    <h4 style={ style.heading }>
                        {this.props.name}
                    </h4>
                    <span>
                        id: {this.props.id}<br />
                        published: {this.props.published}
                    </span>
                    <div>
                        <h5>
                            <img style={style.avatar} src={this.props.creator.avatar} />
                            By: {this.props.creator.name}
                        </h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPlaylistItem