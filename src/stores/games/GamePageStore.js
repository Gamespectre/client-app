import alt from '../flux'
import PageActions from '../../actions/PageActions'

class GamePageStore {

    constructor() {
        this.state = {}
        this.bindActions(PageActions)
    }
}

export default alt.createStore(GamePageStore, 'gamepagestore')