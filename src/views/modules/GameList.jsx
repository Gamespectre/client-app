import React from 'react'
import GameCard from '../components/GameCard.jsx'
import GameActions from '../../actions/GameActions'
import ListDisplay from '../components/ListDisplay.jsx'
import { RouteHandler } from 'react-router'
import GameListData from '../../data/collections/GameList'
import { reactiveComponent } from 'mobservable'
import RouteTransition from '../../lib/RouteTransition.jsx'
import { HistoryLocation } from  'react-router'

class GameList extends ListDisplay {

    constructor() {
        super()

        this.resource = {
            name: 'game',
            method: 'list'
        }

        this.data = GameListData
        this.actions = GameActions
        this.fetch()
    }

    render() {

        return (
            <section>
                <div className="card-list">
                    {GameListData.games.map((game, idx) => {
                        return <GameCard key={idx} game={game} />
                    })}
                </div>
            </section>
        )
    }
}

export default reactiveComponent(GameList)