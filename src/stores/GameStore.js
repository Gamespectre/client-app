import alt from '../flux'
import { addons } from 'react'
import gameSource from '../sources/gameSource'
import ResourceActions from '../actions/ResourceActions'

const resetState = {
    games: [],
    isLoading: false,
    filters: {},
    sorting: {},
    forceUpdate: false,
    shouldPaginate: false,
    pagination: {
        perPage: 0,
        total: 0,
        currentPage: 0,
        totalPages: 1
    }
}

class GameStore {
    constructor() {
        this.state = resetState

        this.registerAsync(gameSource)
        this.bindActions(ResourceActions)
    }

    onReceivedResults(results) {
        let currentGames = this.getInstance().getState().games
        Array.prototype.push.apply(currentGames, results.data)

        let pagination = results.meta.pagination

        this.setState({
            games: currentGames,
            isLoading: false,
            forceUpdate: false,
            pagination: {
                perPage: pagination.per_page,
                total: pagination.total,
                currentPage: pagination.current_page,
                totalPages: pagination.total_pages
            }
        })
    }

    onLoading() {
        this.setState({
            isLoading: true
        })
    }

    onError(error) {
        this.setState({
            isLoading: false,
            forceUpdate: true
        })
    }

    onRefresh() {
        this.setState({
            forceUpdate: true,
            pageLoaded: false
        })

        this.preventDefault()
    }

    onPaginate(toggle) {
        this.setState({
            shouldPaginate: toggle
        })
    }

    onReset() {
        this.setState(resetState)
    }
}

export default alt.createStore(GameStore, 'gamestore')