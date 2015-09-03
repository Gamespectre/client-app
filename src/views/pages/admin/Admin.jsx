import React from 'react'

class Admin extends React.Component {

    render() {

        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

export default Admin