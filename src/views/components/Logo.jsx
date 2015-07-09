import React from 'react'
import Radium from 'radium'
import { logo as style} from '../../style/components/logo'

class Logo extends React.Component {

    render() {
        return (
            <div style={ style.wrapper }>
                <h1 style={ style.logo.h1 }>
                    <span style={ style.logo.game }>game</span>
                    <span style={ style.logo.spectre }>spectre</span>
                </h1>
            </div>
        )
    }
}

export default Radium(Logo)