import alt from '../flux'

class ResourceActions {

    constructor() {

    }

    gameListFetched(results) {
        return results.data.data
    }
}

export default alt.createActions(ResourceActions)