import React, { PropTypes } from 'react'
import { reactiveComponent } from 'mobservable-react'

@reactiveComponent
class AdminGameItem extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        value: PropTypes.number,
        change: PropTypes.func.isRequired
    }

    render() {

        console.log(this.props.checked)

        return (
            <li>
                <input
                    type="checkbox"
                    name={this.props.title}
                    checked={this.props.checked}
                    value={this.props.id}
                    onChange={this.props.change} />

                <div>
                    <img src={this.props.image} />
                    <h4>
                        {`${this.props.type}: ${this.props.title}`}
                    </h4>
                    <p>{this.props.description}</p>
                    <p>{this.props.year}</p>
                </div>
            </li>
        )
    }
}

export default AdminGameItem