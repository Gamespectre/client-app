import GameList from '../data/collections/GameList'
import mobservable from 'mobservable'
import game from '../data/items/game'
import app from '../data/App'

export default {

    receivedResults(results) {
        results.forEach(gameData => {
            let gameItem = game(gameData)
            GameList.games.push(gameItem)
        })
        GameList.loading = false
    },

    loading() {
        GameList.loading = true
    },

    error(err) {
        app.error = {
            type: err.status,
            message: err.error
        }
    }
}