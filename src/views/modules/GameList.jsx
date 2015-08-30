import React from 'react'
import ApiClient from '../../api/ApiClient'
import GameCard from '../components/GameCard.jsx'
import { resolve } from 'react-resolver'
import { reactiveComponent } from 'mobservable-react'

@resolve('games', (props) => {
    return ApiClient.fetch('list', 'game').then(({ data }) => data.data)
})
class GameList extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                <section className="card-list">
                    {this.props.games.map((game, idx) => {
                        return <GameCard key={game.id} game={game} />
                    })}
                </section>
            </div>
        )
    }
}

export default GameList