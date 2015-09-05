import React from 'react'
import ApiClient from '../../api/ApiClient'
import GameList from '../../data/models/GameList'
import Context from '../../lib/ContextDecorator'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'

@resolve('game', ({ params }) => {
    return ApiClient.fetch('get', 'game', params.game).then(({data}) => data.data)
})
@reactiveComponent
class GamePage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="page game-page">
                <header className="page-header">
                    <div className="image-wrapper">
                        <img src={this.props.game.image} />
                    </div>
                    <article className="header-content">
                        <h1>
                            {this.props.game.title}
                        </h1>
                        <p>
                            {this.props.game.description}
                        </p>
                    </article>
                </header>
                <article className="content">

                </article>
            </div>
        )
    }
}

export default GamePage