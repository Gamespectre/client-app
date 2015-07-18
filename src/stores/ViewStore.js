import alt from '../flux'
import ViewActions from '../actions/ViewActions'

class ViewStore {

    constructor() {
        this.state = {}
        this.bindActions(ViewActions)
    }
}

export default alt.createStore(ViewStore, 'viewstore')