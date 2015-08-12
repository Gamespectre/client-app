import React from 'react'
import GameCard from '../components/GameCard.jsx'
import GameActions from '../../actions/GameActions'
import GameListData from '../../data/collections/GameList'
import ListDisplay from '../components/ListDisplay.jsx'
import { reactiveComponent } from 'mobservable'
import ListService from '../../app/ListService'
import game from '../../data/items/game'

const listService = new ListService(GameListData, GameActions)

class GameList extends ListDisplay {

    constructor() {
        super()

        this.list = listService
        this.list.fetch()
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

export default reactiveComponent(GameList)