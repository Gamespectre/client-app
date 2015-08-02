import React from 'react'
import Radium from 'radium'

class GameCard extends React.Component {

    render() {

        return (
            <article className="card game-card">
                <div className="content-wrapper">
                    <div className="image-wrapper">
                        <img src={this.props.image} alt={this.props.title} />
                    </div>
                    <article className="card-content">
                        <header>
                            <h2>{this.props.title}</h2>
                        </header>
                    </article>
                </div>
            </article>
        )
    }
}

export default GameCard