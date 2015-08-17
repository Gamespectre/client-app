import mobservable from 'mobservable'
import crud from '../utils/crud'
import assign from 'object-assign'
import game from '../items/game'

let functions = crud(game)

export default assign(mobservable.makeReactive({
    data: {},
    name: 'game',
    method: 'get'
}), functions)