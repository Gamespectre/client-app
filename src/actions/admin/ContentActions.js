import alt from '../../flux'

class ContentActions {

    importResults(data) {
        this.dispatch(data)
    }
}

export default alt.createActions(ContentActions)