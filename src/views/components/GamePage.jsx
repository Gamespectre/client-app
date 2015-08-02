import React from 'react'
import connectToStores from 'alt/utils/connectToStores'

@connectToStores
class GamePage extends React.Component {

    static getStores() {
        return [GamePageStore];
    }

    static getPropsFromStores() {
        return GamePageStore.getState()
    }

    render() {

        return (
            <div>
                <h1>
                    {this.props.title}
                </h1>
                <p>
                    {this.props.description}
                </p>
            </div>
        )
    }
}

export default GamePage