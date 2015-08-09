import GameList from '../data/collections/GameList'
import game from '../data/items/game'
import app from '../data/App'

export default {

    receivedResults(results: Array) {
        results.forEach(gameData => {
            let gameItem = game(gameData)
            GameList.games.push(gameItem)
        })
        GameList.loading = false
    }
}