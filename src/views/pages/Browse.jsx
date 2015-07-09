import React from 'react'
import Radium from 'radium'
import connectToStores from 'alt/utils/connectToStores'
import ResourceStore from '../../stores/ResourceStore'

class Browse extends React.Component {

    static getStores() {
        return [ResourceStore]
    }

    static getPropsFromStores() {
        return ResourceStore.getState()
    }

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                yo!
            </div>
        )
    }
}

export default Browse

/*{this.props.games.map(game => {
 return (
 <article key={game.id}>
 <h3>game.title</h3>
 </article>
 )
 })}*/