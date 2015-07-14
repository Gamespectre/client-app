import alt from '../../flux'
import GameActions from '../../actions/admin/GameActions'
import AdminStorePrototype from './AdminStorePrototype'

class GameAdminStore extends AdminStorePrototype {

    constructor() {
        super()

        this.state = {
            games: []
        }

        this.bindActions(GameActions)
    }

    importGames(games) {
        this.setState({ games: games })
    }

    clear() {
        this.setState({games: [] })
    }

}

export default alt.createStore(GameAdminStore, 'gameadminstore')