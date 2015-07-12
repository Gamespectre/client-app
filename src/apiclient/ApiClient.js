import axios from 'axios'
import apiconfig from '../apiconfig'

const apiUrl = 'http://spectator-api.dev/'

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

    static fetch(resource: string, baseName: string, baseId: number = -1) {
        let client = new ApiClient(baseName, baseId)
        return client.retrieve(resource)
    }

    retrieve(resource: string = "list", options: Object = {}) {
        const endpoint = this.getEndpoint(resource)
        const uri = typeof endpoint === 'function' ? endpoint(this.baseId) : endpoint

        return axios.get(`${apiUrl}${this.baseName}/${uri}`, ...options).catch(this.handleErrors)
    }

    /**
     *  Private methods
     */

    handleErrors(response) {
        if (response instanceof Error) {
            console.error('Error', response.message);
        } else {
            console.warn("Data: ", response.data);
            console.warn("Status: ", response.status);
            console.warn("Headers: ", response.headers);
            console.warn("Config: ", response.config);
        }
    }

    getEndpoint(resource) {
        const endpoint = endpoints[this.baseName][resource]
        if(typeof endpoint === 'undefined') throw new ReferenceError("The resource you requested is not valid.")
        this.validateClient(endpoint)

        return endpoint
    }

    validateClient(endpoint) {
        if(typeof endpoint === 'function' && this.baseId < 0) {
            throw new ReferenceError("You need to supply a baseId for this resource.")
        }
    }
}

export default ApiClient

export const endpoints = {
    game: {
        base: 'game',
        list: 'index',
        get: (id: number) => `show/${id}`,
        series: (id: number) => `series/${id}`,
        videos: (id: number) => `videos/${id}`,
        creators: (id: number) => `creators/${id}`
    },
    video: {
        base: 'video',
        get: (id: number) => `show/${id}`,
        series: (id: number) => `series/${id}`,
        game: (id: number) => `game/${id}`,
        creator: (id: number) => `creator/${id}`
    },
    series: {
        base: (id: number) => `series/${id}`,
        get: (id: number) => `show/${id}`,
        videos: (id: number) => `videos/${id}`,
        creator: (id: number) => `creator/${id}`,
        game: (id: number) => `game/${id}`
    },
    creator: {
        base: 'creator',
        list: 'index',
        get: (id: number) => `show/${id}`,
        videos: (id: number) => `videos/${id}`,
        series: (id: number) => `series/${id}`,
        games: (id: number) => `games/${id}`
    }
}

export default ApiClient