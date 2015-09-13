import React from 'react'
import ApiClient from '../../api/ApiClient'
import RelatedVideos from './RelatedVideos.jsx'
import RelatedSeries from './RelatedSeries.jsx'
import RelatedCreators from './RelatedCreators.jsx'
import { reactiveComponent } from 'mobservable-react'
import { resolve } from 'react-resolver'

@resolve('game', ({ params }) => {
    return ApiClient.fetch('get', 'game', params.game, {perPage: 1000}).then(({data}) => data.data)
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
                    <RelatedVideos parentType="game" parentId={this.props.game.id} />
                    <RelatedSeries parentType="game" parentId={this.props.game.id} />
                    <RelatedCreators parentType="game" parentId={this.props.game.id} />
                </article>
            </div>
        )
    }
}

export default GamePage