import alt from '../flux'

class ViewActions {

    constructor() {
        this.generateActions('setPaginationLink')
    }
}

export default alt.createActions(ViewActions)