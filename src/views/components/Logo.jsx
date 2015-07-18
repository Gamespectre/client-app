import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import { logo as style} from '../../style/components/logo'

let StyledLink = Radium(Link)

@Radium
class Logo extends React.Component {

    render() {
        return (
            <div className="logo-box" style={ style.wrapper }>
                <h1 style={ style.logo.h1 }>
                    <StyledLink style={ style.logo.link } to="front">
                        <span key="logoGame" style={ style.logo.game }>game</span>
                        <span key="logoSpectre" style={ style.logo.spectre }>spectre</span>
                    </StyledLink>
                </h1>
            </div>
        )
    }
}

export default Radium(Logo)