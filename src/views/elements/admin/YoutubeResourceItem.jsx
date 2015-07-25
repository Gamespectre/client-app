import React, { PropTypes } from 'react'
import { adminList as style } from '../../../style/components/adminList'
import Radium from 'radium'

@Radium
class YoutubeResourceItem extends React.Component {

    render() {
        return (
            <div style={ style.listItem }>
                <input
                    style={style.checkbox}
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.state.chosen}
                    value={this.props.id}
                    onChange={this.props.check}
                    disabled={this.props.disabled || false} />

                <div style={ style.content }>
                    <h4 style={ style.heading }>
                        {this.props.name}
                    </h4>
                    {this.props.hasOwnProperty('image') ? <img style={ style.image } src={this.props.image} /> : ""}
                    {this.props.hasOwnProperty('description') ? <p>{this.props.description}</p> : ""}
                    <p>
                        id: {this.props.id}<br />
                        published: {this.props.published}
                    </p>
                    <input type="text"
                        onChange={this.props.setGame}
                        value={this.props.state.game} />
                </div>
            </div>
        )
    }
}

export default YoutubeResourceItem