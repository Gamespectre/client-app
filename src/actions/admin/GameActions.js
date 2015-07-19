import alt from '../../flux'

class GameActions {

    importGames(data) {
        this.dispatch(data.game)
    }
}

export default alt.createActions(GameActions)