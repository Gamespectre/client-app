import React from 'react'
import { RouteHandler } from 'react-router'
import RouteTransition from '../../lib/RouteTransition.jsx'
import context from '../../lib/ContextDecorator'

@context("router")
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