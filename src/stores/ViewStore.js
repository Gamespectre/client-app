import alt from '../flux'
import ViewActions from '../actions/ViewActions'

class ViewStore {

    constructor() {
        this.state = {

        }
        this.bindActions(ViewActions)
    }

    nextPage(data) {

    }


}

export default alt.createStore(ViewStore, 'viewstore')