import ApiClient from '../apiclient/ApiClient'
import ResourceActions from '../actions/ResourceActions'

const GameSource = {
    list: {
        remote: (state) => {
            return ApiClient.fetch('list', 'game')
        },
        success: ResourceActions.gameListFetched
    }
}

export default GameSource