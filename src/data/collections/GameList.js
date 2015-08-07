import mobservable from 'mobservable'

let GameList = {}

mobservable.props(GameList, {
    games: mobservable.array([]),
    loading: false
})

export default GameList;