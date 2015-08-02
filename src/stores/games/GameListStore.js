import alt from '../../flux'
import { addons } from 'react'
import ResourceActions from '../../actions/ResourceActions'

const resetState = {
    games: [],
    isLoading: false,
    filters: {},
    sorting: {},
    forceUpdate: false,
}

class GameListStore {
    constructor() {
        this.state = resetState
        this.bindActions(ResourceActions)
    }

    onReceivedResults(results) {
        let currentGames = this.getInstance().getState().games
        Array.prototype.push.apply(currentGames, results)

        this.setState({
            games: currentGames,
            isLoading: false,
            forceUpdate: false
        })
    }

    onLoading() {
        this.setState({
            isLoading: true
        })
    }

    onError(error) {
        this.setState({
            isLoading: false,
            forceUpdate: true
        })
    }

    onRefresh() {
        this.setState({
            forceUpdate: true,
            pageLoaded: false
        })

        this.preventDefault()
    }

    onReset() {
        this.setState(resetState)
    }
}

export default alt.createStore(GameListStore, 'gamestore')