import alt from '../../flux'

class GameActions {

    importGames(data) {
        let games = data.games
        this.dispatch(games)
    }
}

export default alt.createActions(GameActions)