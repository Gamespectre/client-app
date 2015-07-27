import alt from '../flux'

class ResourceActions {

    constructor() {
        this.generateActions('loading', 'error', 'reset', 'refresh')
    }

    receivedResults(results) {
        this.dispatch(results.data.data)
    }
}

export default alt.createActions(ResourceActions)