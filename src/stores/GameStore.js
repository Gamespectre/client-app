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
    page: 1
}

class GameStore {
    constructor() {
        this.state = resetState

        this.registerAsync(gameSource)
        this.bindActions(ResourceActions)
    }

    onReceivedResults(games) {
        let currentGames = this.getInstance().getState().games
        this.setState({
            games: addons.update(currentGames, {
                $push: games
            }),
            isLoading: false,
            forceUpdate: false
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
            forceUpdate: true
        })
    }

    onReset() {
        this.setState(resetState)
    }

    onLoadNextpage() {
        let currentPage = this.getInstance().getState().page

        this.setState({
            page: addons.update(currentPage, {
                $apply(page) {
                    return page++
                }
            })
        })
    }
}

export default alt.createStore(GameStore, 'gamestore')