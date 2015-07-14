import alt from '../../flux'

class AdminActions {

    constructor() {
        this.generateActions('clear')
    }
}

export default alt.createActions(AdminActions)