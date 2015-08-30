import React from 'react'
import { Link } from 'react-router'
import GamePage from '../../data/models/GamePage'
import slug from 'slug'

class GameCard extends React.Component {

    render() {

        return (
            <article className="card game-card">
                <Link to="gamepage" params={{ game: slug(this.props.game.title, {lower: true}) }}>
                    <div className="content-wrapper">
                        <div className="image-wrapper">
                            <img src={this.props.game.image} alt={this.props.game.title} />
                        </div>
                        <article className="card-content">
                            <header>
                                <h2>{this.props.game.title}</h2>
                            </header>
                        </article>
                    </div>
                </Link>
            </article>
        )
    }
}

export default GameCard