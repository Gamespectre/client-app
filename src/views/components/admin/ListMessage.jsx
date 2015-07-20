import React from 'react'

class ListMessage extends React.Component {

    render() {

        return (
            <li>
                <p>
                    {this.props.message}
                </p>
            </li>
        )
    }
}

export default ListMessage