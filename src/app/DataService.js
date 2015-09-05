import mobservable from 'mobservable'

class DataService {

    constructor() {}

    load(requester, dataStructure) {
        return requester().then(data => dataStructure(data))
    }
}

export default DataService