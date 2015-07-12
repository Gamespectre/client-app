import alt from '../flux'
import { datasource } from 'alt/utils/decorators'
import gameSource from '../sources/gameSource'
import ResourceActions from '../actions/ResourceActions'
import DatasourceActions from '../actions/DatasourceActions'

@datasource(gameSource)
class GameStore {
    constructor() {
        this.state = {
            games: []
        }

        this.bindActions(ResourceActions)
        this.bindActions(DatasourceActions)
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