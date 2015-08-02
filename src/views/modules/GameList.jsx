import React from 'react'
import GameCard from '../components/GameCard.jsx'
import connectToStores from 'alt/utils/connectToStores'
import GameListStore from '../../stores/games/GameListStore'
import ResourceActions from '../../actions/ResourceActions'
import ListDisplay from '../components/ListDisplay.jsx'
import { RouteHandler } from 'react-router'

@connectToStores
class GameList extends ListDisplay {

    static getStores() {
        return [GameListStore];
    }

    static getPropsFromStores() {
        return GameListStore.getState()
    }

    constructor() {
        super()

        this.resource = {
            name: 'game',
            method: 'list'
        }

        this.state = {
            page: 1,
            fetched: 0,
            total: 9999
        }

        this.actions = ResourceActions
        this.fetch()
    }

    render() {
        return (
            <section>
                <div className="card-list">
                    {this.props.games.map((game, idx) => {
                        return <GameCard key={idx} {...game} />
                    })}
                </div>
                <RouteHandler />
            </section>
        )
    }
}

export default GameList