import React from 'react'
import { featured as style } from '../../style/components/featured'

class FeaturedContent extends React.Component {

    render() {

        return (
            <section style={ style.box }>
                <h2 style={ style.heading }>
                    Check this out!
                </h2>
            </section>
        )
    }
}

export default FeaturedContent