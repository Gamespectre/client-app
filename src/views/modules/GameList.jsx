import React from 'react'
import ApiClient from '../../api/ApiClient'
import GameCard from '../components/GameCard.jsx'
import { resolve } from 'react-resolver'
import { reactiveComponent } from 'mobservable-react'
import InfinityList from '../../decorators/InfinityList'
import contentSorting from '../../decorators/ContentSorting'
import sorting from '../../data/sorting/game'

@InfinityList
@contentSorting(listSorters)
@resolve('games', ({ serverSortProperties, shouldFetch, page, receiveData, receiveMeta }) => {
    if(shouldFetch()) return ApiClient.fetch('list', 'game', 0, {
        page: page,
        perPage: 20,
        sorting: serverSortProperties
    }).then(receiveMeta).then(receiveData)
})
@reactiveComponent
class GameList extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                {this.props.sortControls}
                <section className="card-list">
                    {this.props.listData.map(game => {
                        return <GameCard key={game.id} game={game} />
                    })}
                </section>
            </div>
        )
    }
}

export default GameList