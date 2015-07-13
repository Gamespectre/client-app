import alt from '../../flux'
import ContentApiClient from '../../apiclient/ContentApiClient'

class ContentAdminActions {

    constructor() {
        this.generateActions('setCandidates', 'clear')
    }
}

export default alt.createActions(ContentAdminActions)