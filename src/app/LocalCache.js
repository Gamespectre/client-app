class LocalCache {

    constructor() {
        if(!__CLIENT__) {
            return false
        }
    }

    put(key, value, session = false) {
        let storage = session ? sessionStorage : localStorage
        storage.setItem(key, value)
    }

    get(key) {
        let item = localStorage.getItem(key) || sessionStorage.getItem(key)
        return item === null ? false : item
    }

    remember(key, valueFunc, session = false) {
        let value = valueFunc()
        this.put(key, value, session)

        return value
    }
}

export default new LocalCache()