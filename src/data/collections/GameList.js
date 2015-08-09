import mobservable from 'mobservable'
import ResourceList from './ResourceList'
import assign from 'object-assign'

export default mobservable.makeReactive(assign(ResourceList, {
    games: [],
    name: 'game',
    method: 'list'
}))