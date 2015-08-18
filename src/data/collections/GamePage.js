import mobservable from 'mobservable'
import assign from 'object-assign'
import game from '../items/game'

export default mobservable.makeReactive({
    data: {},
    name: 'game',
    method: 'get',
    processor: mobservable.asReference(game)
})