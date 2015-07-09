import alt from '../flux'

class ResourceStore {
    constructor() {
        this.state = {
            games: [
                {
                    id: 1,
                    title: "The witcher 3"
                },
                {
                    id: 2,
                    title: "Fallout new vegas"
                },
            ]
        }
    }
}

export default alt.createStore(ResourceStore, 'gamestore')