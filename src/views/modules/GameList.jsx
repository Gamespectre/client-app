import React from 'react'
import ApiClient from '../../api/ApiClient'
import GameCard from '../components/GameCard.jsx'
import { resolve } from 'react-resolver'
import { reactiveComponent } from 'mobservable-react'
import InfinityList from '../../decorators/InfinityList'

@InfinityList
@resolve('games', ({ shouldFetch, page, receiveData, receiveMeta }) => {
    if(shouldFetch()) return ApiClient.fetch('list', 'game', 0, {
        page: page
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