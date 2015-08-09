import React from 'react'
import { Link } from 'react-router'

class Logo extends React.Component {

    render() {
        return (
            <div className="logo-box">
                <h1>
                    <Link to="front">
                        <span key="logoGame" className="logo-part-game">game</span>
                        <span key="logoSpectre" className="logo-part-spectre">spectre</span>
                    </Link>
                </h1>
            </div>
        )
    }
}

export default Logo