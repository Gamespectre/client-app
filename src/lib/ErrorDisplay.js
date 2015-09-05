import React, {Component, PropTypes} from 'react'
import ErrorStackParser from 'error-stack-parser'

export default class RedBox extends Component {
    static propTypes = {
        error: PropTypes.instanceOf(Error).isRequired
    }
    static displayName = 'RedBox'
    render () {
        const {error} = this.props
        const frames = ErrorStackParser.parse(error).map(f => {
            const link = `${f.fileName}:${f.lineNumber}:${f.columnNumber}`
            return (
                <div>
                    <div>{f.functionName}</div>
                    <div>
                        <a href={link}>{link}</a>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div>{error.name}: {error.message}</div>
                <div>{frames}</div>
            </div>
        )
    }
}