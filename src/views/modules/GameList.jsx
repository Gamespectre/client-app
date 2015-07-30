import React from 'react'
import GameCard from '../components/GameCard.jsx'
import connectToStores from 'alt/utils/connectToStores'
import GameStore from '../../stores/GameStore'
import ResourceActions from '../../actions/ResourceActions'
import ListDisplay from '../components/ListDisplay.jsx'

@connectToStores
class GameList extends ListDisplay {

    static getStores() {
        return [GameStore];
    }

    static getPropsFromStores() {
        return GameStore.getState()
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
            </section>
        )
    }
}

export default GameList