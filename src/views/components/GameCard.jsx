import React from 'react'
import connectToStores from '../../../node_modules/alt/utils/connectToStores'
import GameStore from '../../stores/GameStore'
import Radium from 'radium'
import { cardStyle as style } from '../../style/components/cardStyle'

@Radium
class GameCard extends React.Component {

    render() {
        return (
            <article style={style.card}>
                <div style={style.imageWrapper}>
                    <img style={style.image} src={this.props.image} alt={this.props.title} />
                </div>
                <h2 style={style.heading}>{this.props.id} {this.props.title}</h2>
                <footer>
                    <ul>
                        <li>Creators: {this.props.creators.data.length}</li>
                        <li>Series: {this.props.series.data.length}</li>
                    </ul>
                </footer>
            </article>
        )
    }
}

export default GameCard