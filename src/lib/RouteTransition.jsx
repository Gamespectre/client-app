const React = require('react/addons');
const { PropTypes } = React;
const { TransitionSpring } = require('react-motion');

const RouteTransition = React.createClass({
    propTypes: {
        pathname: PropTypes.string.isRequired
    },

    willEnter() {
        const { children } = this.props;

        return {
            handler: children,
            opacity: { val: 0 },
            scale: { val: 0.95 }
        };
    },

    willLeave(key, value) {
        return {
            handler: value.handler,
            opacity: { val: 0 },
            scale: { val: 0.95 }
        };
    },

    getEndValue() {
        const { children, pathname } = this.props;

        return {
            [pathname]: {
                handler: children,
                opacity: { val: 1 },
                scale: { val: 1 }
            }
        };
    },

    render() {
        return (
            <TransitionSpring
                endValue={this.getEndValue}
                willEnter={this.willEnter}
                willLeave={this.willLeave}>
                {interpolated =>
                    <div style={{ position: 'relative' }}>
                        {Object.keys(interpolated).map(key => {
                            return (
                                <div key={`${key}-transition`}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        opacity: interpolated[key].opacity.val,
                                        transform: `scale(${interpolated[key].scale.val})`
                                    }}>
                                    {interpolated[key].handler}
                                </div>
                            )
                        })}
                    </div>
                }
            </TransitionSpring>
        );
    }
});

module.exports = RouteTransition;