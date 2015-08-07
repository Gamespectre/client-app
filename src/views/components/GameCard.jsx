import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router'
import GamePage from '../../data/collections/GamePage'

class GameCard extends React.Component {

    openCard(e) {
        GamePage.game = this.props.game
    }

    render() {

        return (
            <article className="card game-card" onClick={this.openCard.bind(this)}>
                <Link to="gamepage" params={{ game: this.props.game.id }}>
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