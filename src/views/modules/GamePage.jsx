import React from 'react'
import GamePageData from '../../data/collections/GamePage'

class GamePage extends React.Component {

    render() {

        return (
            <div className="page game-page">
                <header className="page-header">
                    <div className="image-wrapper">
                        <img src={GamePageData.game.image} />
                    </div>
                    <article className="header-content">
                        <h1>
                            {GamePageData.game.title}
                        </h1>
                        <p>
                            {GamePageData.game.description}
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