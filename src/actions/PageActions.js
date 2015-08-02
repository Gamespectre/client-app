import alt from '../flux'

class PageActions {

    constructor() {
        this.generateActions('load', 'reset')
    }
}

export default alt.createActions(PageActions)