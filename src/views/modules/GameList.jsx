import React from 'react'
import GameCard from '../components/GameCard.jsx'
import Radium from 'radium'

@Radium
class GameList extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <section>
                Game list
            </section>
        )
    }
}

export default GameList

/*
 {this.props.games.map(game => {
 return <GameCard key={game.id} {...game} />
 })}
 */