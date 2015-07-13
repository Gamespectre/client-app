import alt from '../../flux'
import ContentAdminActions from '../../actions/admin/ContentAdminActions'

class AdminContentStore {

    constructor() {
        this.state = {
            response: []
        }
        this.bindActions(ContentAdminActions)
    }

    setCandidates(data) {
        this.setState({ response: data })
    }

    clear() {
        this.setState({response: [] })
    }

}

export default alt.createStore(AdminContentStore, 'admincontentstore')