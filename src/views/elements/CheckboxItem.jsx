import React, { PropTypes } from 'react'

class CheckboxItem extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        value: PropTypes.number,
        change: PropTypes.func.isRequired
    }

    render() {
        return (
            <li style={{ display: 'block' }}>
                <label>
                    <input type="checkbox"
                           name={this.props.name}
                           checked={this.props.checked}
                           value={this.props.id}
                           onChange={this.props.change} />

                    <span style={{paddingLeft: '1em'}}>{this.props.name}</span>
                </label>
            </li>
        )
    }
}

export default CheckboxItem