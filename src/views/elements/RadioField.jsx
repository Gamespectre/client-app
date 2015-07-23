import React from 'react'

class RadioField extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired,
        selected: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        inputs: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired
        })).isRequired
    }

    render() {

        let defaultProps = {
            type: "radio",
            onChange: this.props.onChange,
            name: this.props.name
        }

        return (
            <div>
                {this.props.inputs.map(input => {
                    return (
                        <label key={input.value}>
                            <input
                                value={input.value}
                                checked={this.props.selected === input.value}
                                {...defaultProps} />
                            {input.label}
                        </label>
                    )
                })}
            </div>
        )
    }
}

export default RadioField