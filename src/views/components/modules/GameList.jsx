import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import GameStore from '../../../stores/GameStore'
import GameCard from '../parts/GameCard.jsx'
import { fetchGameList } from '../../../actions/DatasourceActions'
import Radium from 'radium'
import { cardList as style } from '../../../style/components/cardList'

@Radium
@connectToStores
class GameList extends React.Component {

    static getStores() {
        return [GameStore]
    }

    static getPropsFromStores() {
        return GameStore.getState()
    }

    constructor() {
        super()
        fetchGameList()
    }

    render() {
        return (
            <div>
                <section style={style.list}>
                    {this.props.games.map(game => {
                        return <GameCard key={game.id} {...game} />
                    })}
                </section>
            </div>
        )
    }
}

export default GameList