import React from 'react'
import GamePageData from '../../data/collections/GamePage'
import { modalPage as styles } from '../../style/components/modalPage'

class GamePage extends React.Component {

    render() {

        return (
            <div style={styles.pageWrapper}>
                <div style={styles.imgWrapper}>
                    <img src={GamePageData.game.image} style={styles.img} />
                </div>
                <article style={styles.contentWrapper}>
                    <h1 style={styles.heading}>
                        {GamePageData.game.title}
                    </h1>
                    <p>
                        {GamePageData.game.description}
                    </p>
                </article>
            </div>
        )
    }
}

export default GamePage