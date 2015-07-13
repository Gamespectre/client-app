import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import ContentAdminStore from '../../../stores/admin/ContentAdminStore'

@connectToStores
class GameListControl extends React.Component {

    static getStores() {
        return [ContentAdminStore]
    }

    static getPropsFromStores() {
        return ContentAdminStore.getState()
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.response.map(game => {
                        return <li>{game.title[0]}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default GameListControl