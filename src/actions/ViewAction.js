import alt from '../flux'

class ViewAction {

    constructor() {
        this.generateActions('set', 'nextPage', 'prevPage')
    }
}

export default alt.createActions(ViewAction)