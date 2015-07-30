import alt from '../flux'

class ResourceActions {

    constructor() {
        this.generateActions('loading', 'error', 'reset', 'refresh', 'paginate')
    }

    receivedResults(results) {
        this.dispatch(results)
    }
}

export default alt.createActions(ResourceActions)