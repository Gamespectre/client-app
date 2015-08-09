import React, { PropTypes } from 'react'

class AdminGameItem extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        value: PropTypes.number,
        change: PropTypes.func.isRequired
    }

    render() {
        return (
            <li>
                <input
                    type="checkbox"
                    name={this.props.name}
                    checked={this.props.checked}
                    value={this.props.id}
                    onChange={this.props.change} />

                <div>
                    <img src={this.props.image} />
                    <h4>
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