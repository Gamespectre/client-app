class ApiClient {

    constructor(baseName: string, baseId: number = -1) {
        // Relative ID. For retrieving resources relative to something, like a game.
        // Each instance of the ApiClient is tied to a specific resource, and retrieving
        // stuff is then mostly automatic.
        this.baseId = baseId
        this.baseName = baseName
    }

    setId(baseId: number): void {
        this.baseId = baseId
    }

    static create(resource: string, baseName: string, baseId: number = -1): ApiClient {
        let client = new ApiClient(baseName, baseId)
        return client
    }

    retrieve(): Object {
        return {}
    }
}

const endpoints = {
    game: {
        base: 'game',
        list: 'index',
        series: 'series',
        videos: 'videos',
        creators: 'creators'
    },
    video: {
        base: 'video',
        series: 'series',
        game: 'game',
        creator: 'creator'
    },
    series: {
        base: 'series',
        videos: '',
        creator: '',
        game: ''
    },
    creator: {
        base: 'creator',
        list: '',
        videos: '',
        series: '',
        games: ''
    }
}

export default ApiClient