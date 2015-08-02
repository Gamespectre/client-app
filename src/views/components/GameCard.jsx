import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'

class GameCard extends React.Component {

    render() {

        return (
            <article className="card game-card">
                <Link to="gamepage" params={{ game: this.props.id }}>
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
                </Link>
            </article>
        )
    }
}

export default GameCard