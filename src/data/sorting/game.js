import { makeReactive } from 'mobservable'
import SortAscDesc from '../../views/elements/SortAscDesc.jsx'

export default makeReactive({
    name: 'published',
    property: 'year',
    options: {
        desc: 'newest',
        asc: 'oldest'
    },
    fn(a, b) {

    },
    component: SortAscDesc
})