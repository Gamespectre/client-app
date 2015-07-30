import ApiClient from '../api/ApiClient'
import ResourceActions from '../actions/ResourceActions'

const GameSource = {
    list: {
        remote: (state) => {
            // TODO: Send filter and sorting parameters
            let page = state.pagination.currentPage

            if(state.shouldPaginate) {
                page = ++page
            }

            return
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

            let page = state.pagination.currentPage
            let totalPages = state.pagination.totalPages

            if(page >= totalPages && state.games.length > 0) {
                return false
            }
            if(page < totalPages && !state.shouldPaginate && state.games.length > 0) {
                return false
            }

            return 'undefined'
        }
    }
}

export default GameSource