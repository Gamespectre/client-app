import alt from '../../flux'
import ContentActions from '../../actions/admin/ContentActions'
import AdminStorePrototype from './AdminStorePrototype'

class ContentAdminStore extends AdminStorePrototype {

    constructor() {
        super()

        this.state = {
            results: [],
            resource: 'playlist'
        }

        this.bindActions(ContentActions)
    }

    setResource(type) {
        this.setState({
            resource: type
        })
    }

    importResults(results) {
        this.setState({ results: results })
    }

    clear() {
        this.setState({
            results: [],
            resource: this.getInstance().getState().resource
        })
    }

}

export default alt.createStore(ContentAdminStore, 'contentadminstore')