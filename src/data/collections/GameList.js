import mobservable from 'mobservable'

export default mobservable.makeReactive({
    games: [],
    loading: false,
    page: 1,
    fetched: 0,
    total: 9999
})