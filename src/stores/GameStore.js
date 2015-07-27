import alt from '../flux'
import gameSource from '../sources/gameSource'
import ResourceActions from '../actions/ResourceActions'

const resetState = {
    games: [],
    isLoading: false,
    filters: {},
    sorting: {},
    forceUpdate: false
}

class GameStore {
    constructor() {
        this.state = resetState

        this.registerAsync(gameSource)
        this.bindActions(ResourceActions)
    }

    onReceivedResults(games) {
        this.setState({
            games: games,
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
            forceUpdate: true
        })
    }

    onReset() {
        this.setState(resetState)
    }
}

export default alt.createStore(GameStore, 'gamestore')