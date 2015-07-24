import alt from '../../flux'

class AdminActions {

    constructor() {
        this.generateActions('clear', 'setResource')
    }
}

export default alt.createActions(AdminActions)