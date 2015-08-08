import mobservable from 'mobservable'

let app = mobservable.makeReactive({
    user: false,
    error: {}
})

export default app