import React from 'react'
import GameCard from '../components/GameCard.jsx'
import Radium from 'radium'
import ApiClient from '../../api/ApiClient'
import { Resolver } from 'react-resolver'

@Radium
class GameList extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <section>
                {this.props.games.map(game => {
                    return <GameCard key={game.id} {...game} />
                })}
            </section>
        )
    }
}

export default Resolver.createContainer(GameList, {
    contextTypes: {
        router: React.PropTypes.func.isRequired,
    },
    resolve: {
        games: (props, context) => {
            return ApiClient.fetch('list', 'game').then(response => response.data.data)
        }
    }
})