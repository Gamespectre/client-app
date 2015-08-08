import React from 'react'
import GameCard from '../components/GameCard.jsx'
import GameActions from '../../actions/GameActions'
import GamePage from '../components/GamePage.jsx'
import ListDisplay from '../components/ListDisplay.jsx'
import { RouteHandler } from 'react-router'
import GameListData from '../../data/collections/GameList'
import { reactiveComponent } from 'mobservable'

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
                <RouteHandler back="games">
                    <GamePage />
                </RouteHandler>
            </section>
        )
    }
}

export default reactiveComponent(GameList)