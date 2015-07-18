import alt from '../flux'
import gameSource from '../sources/gameSource'
import ResourceActions from '../actions/ResourceActions'

class GameStore {
    constructor() {
        this.state = {
            games: []
        }

        this.bindActions(ResourceActions)
    }

    fetchGameList() {
        this.getInstance().list()
    }

    onGameListFetched(games) {
        this.setState({
            games: games
        })
    }
}

export default alt.createStore(GameStore, 'gamestore')