import alt from '../flux'
import ContentActions from '../actions/ContentActions'

class ContentStore {

    constructor() {
        this.state = {}
        this.bindActions(ContentActions)
    }
}

export default alt.createStore(ContentStore, 'contentstore')