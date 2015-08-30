import React from 'react'
import GamePageData from '../../data/models/GamePage'
import GetRouteData from '../../decorators/GetRouteData'
import GameList from '../../data/models/GameList'
import Context from '../../lib/ContextDecorator'
import { reactiveComponent } from 'mobservable-react'

@Context("router")
@GetRouteData('game', GamePageData, {
    slug: GameList.games
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
                        <img src={GamePageData.data.image} />
                    </div>
                    <article className="header-content">
                        <h1>
                            {GamePageData.data.title}
                        </h1>
                        <p>
                            {GamePageData.data.description}
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