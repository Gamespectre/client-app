import alt from '../../flux'

class ContentActions {

    importPlaylists(data) {
        let playlists = data
        this.dispatch(playlists)
    }

    importCreators(data) {
        let creators = data
        this.dispatch(creators)
    }

    importVideos(data) {
        let videos = data
        this.dispatch(videos)
    }
}

export default alt.createActions(ContentActions)