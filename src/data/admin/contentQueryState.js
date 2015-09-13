import mobservable from 'mobservable'

export default mobservable.makeReactive({
    query: "",
    mode: "search",
    results: [],
    package: {}
})