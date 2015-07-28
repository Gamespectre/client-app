import ApiClient from '../api/ApiClient'
import ResourceActions from '../actions/ResourceActions'

const GameSource = {
    list: {
        remote: (state) => {
            // TODO: Send filter and sorting parameters
            return ApiClient.fetch('list', 'game', 0, state.page)
        },

        local: (state) => {
            return state.games.length > 0 ? state.games : null
        },

        success: ResourceActions.receivedResults,
        loading: ResourceActions.loading,
        error: ResourceActions.error,

        shouldFetch(state) {
            if(state.forceUpdate === true) {
                return true
            }

            return 'undefined'
        }
    }
}

export default GameSource