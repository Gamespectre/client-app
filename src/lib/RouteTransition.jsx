import React from 'react'
import { TransitionSpring } from 'react-motion'

class RouteTransition extends React.Component {

    static propTypes = {
        pathname: React.PropTypes.string.isRequired
    }

    constructor() {
        super()
    }

    willEnter() {
        const { children } = this.props

        return {
            handler: children,
            opacity: { val: 0 },
            scale: { val: 0.95 }
        }
    }

    willLeave(key, value) {
        return {
            handler: value.handler,
            opacity: { val: 0 },
            scale: { val: 0.95 }
        }
    }

    getEndValue() {
        const { children, pathname } = this.props

        return {
            [pathname]: {
                handler: children,
                opacity: { val: 1 },
                scale: { val: 1 }
            }
        }
    }

    render() {
        return (
            <TransitionSpring
                endValue={this.getEndValue}
                willEnter={this.willEnter}
                willLeave={this.willLeave}>
                {interpolated =>
                    <div>
                        {Object.keys(interpolated).map(key =>
                            <div
                                key={`${key}-transition`}
                                style={{
                                    position: 'absolute',
                                    opacity: interpolated[key].opacity.val,
                                    transform: `scale(${interpolated[key].scale.val})`
                                }}>
                                {interpolated[key].handler}
                            </div>
                        )}
                    </div>
                }
            </TransitionSpring>
        )
    }
}

export default RouteTransition