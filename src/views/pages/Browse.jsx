import React from 'react'
import Radium from 'radium'
import connectToStores from 'alt/utils/connectToStores'
import GameStore from '../../stores/GameStore'

class Browse extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Browse