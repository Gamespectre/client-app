import alt from '../../flux'
import ContentActions from '../../actions/admin/ContentActions'
import AdminStorePrototype from './AdminStorePrototype'

class ContentAdminStore extends AdminStorePrototype {

    constructor() {
        super()

        this.state = {
            playlists: [],
            creators: [],
            videos: []
        }

        this.bindActions(ContentActions)
    }

    importPlaylists(playlists) {
        this.setState({ playlists: playlists })
    }

    importCreators(creators) {
        this.setState({ creators: creators })
    }

    importVideos(videos) {
        this.setState({ videos: videos })
    }

    clear() {
        this.setState({
            playlists: [],
            creators: [],
            videos: []
        })
    }

}

export default alt.createStore(ContentAdminStore, 'contentadminstore')