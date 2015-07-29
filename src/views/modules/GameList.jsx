import React from 'react'
import { debounce } from 'lodash'
import GameCard from '../components/GameCard.jsx'
import Radium from 'radium'
import connectToStores from 'alt/utils/connectToStores'
import GameStore from '../../stores/GameStore'
import ApiClient from '../../api/ApiClient'
import ResourceActions from '../../actions/ResourceActions'

@Radium
@connectToStores
class GameList extends React.Component {
    static displayName = "GameList"

    static getStores() {
        return [GameStore];
    }

    static getPropsFromStores() {
        return GameStore.getState()
    }

    constructor() {
        super()
        GameStore.list()

        if(__CLIENT__) {
            window.addEventListener('scroll', this.checkScroll())
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.checkScroll())
    }

    refreshList() {
        ResourceActions.refresh()
        GameStore.list()
    }

    checkScroll(e) {
        return debounce(() => {
            this.fetchNextPage()
        }, 500)
    }

    fetchNextPage() {
        ResourceActions.paginate(true)
        GameStore.list()
    }

    render() {
        return (
            <section>
                <button onClick={this.refreshList.bind(this)}>Refresh</button>
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