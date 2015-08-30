import mobservable from 'mobservable'

let app = mobservable.makeReactive({
    user: false,
    token: null
})

export default app