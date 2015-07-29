import alt from '../flux'
import ViewActions from '../actions/ViewActions'

class ViewStore {

    constructor() {
        this.state = {
            pageLink: ''
        }

        this.bindActions(ViewActions)
    }

    setPaginationLink(pageLink) {
        this.setState({
            pageLink: pageLink
        })
    }
}

export default alt.createStore(ViewStore, 'viewstore')