import React from 'react'

class ResourceHub extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}

export default ResourceHub