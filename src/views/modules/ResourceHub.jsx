import React from 'react'
import { RouteHandler } from 'react-router'
import context from '../../lib/ContextDecorator'

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