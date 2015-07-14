import alt from '../../flux'
import ContentApiClient from '../../apiclient/ContentApiClient'

class ContentAdminActions {

    constructor() {

    }

    importGames(data) {
        let games = data.games
        this.dispatch(games)
    }
}

export default alt.createActions(ContentAdminActions)