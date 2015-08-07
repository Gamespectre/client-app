import GameList from '../data/collections/GameList'
import mobservable from 'mobservable'
import { game } from '../api/packageParsers'
import app from '../data/App'

export default {

    receivedResults(results) {
        results.forEach(game => GameList.games.push(mobservable.fromJson(game)))
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