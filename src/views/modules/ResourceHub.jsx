import React from 'react'
import { RouteHandler } from 'react-router'

class ResourceHub extends React.Component {

    constructor(props, context) {
        super()
    }

    render() {

        return (
            <div>
                <RouteHandler />
            </div>
        )
    }
}

export default ResourceHub