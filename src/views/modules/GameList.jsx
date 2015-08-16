import React from 'react'
import GameCard from '../components/GameCard.jsx'
import GameListData from '../../data/collections/GameList'
import { reactiveComponent } from 'mobservable'
import game from '../../data/items/game'
import InfinityList from '../../decorators/InfinityList'

@InfinityList(GameListData, {
    games: game
})
@reactiveComponent
class GameList extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                <section className="card-list">
                    {GameListData.games.map((game, idx) => {
                        return <GameCard key={idx} game={game} />
                    })}
                </section>
            </div>
        )
    }
}

export default GameList