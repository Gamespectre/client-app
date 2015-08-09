import React, { PropTypes } from 'react'

class YoutubeResourceItem extends React.Component {

    render() {
        return (
            <div>
                <input
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.state.chosen}
                    value={this.props.id}
                    onChange={this.props.check}
                    disabled={this.props.disabled || false} />

                <div>
                    <h4>
                        {this.props.name}
                    </h4>
                    {this.props.hasOwnProperty('image') ? <img src={this.props.image} /> : ""}
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