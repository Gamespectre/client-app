import axios from 'axios'
import apiconfig from '../apiconfig'
import TokenService from '../app/TokenService'
import app from '../data/app'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

const defaultOptions = {
    perPage: 20
}

class ApiClient {

    constructor(baseName: string, baseId = -1) {
        // Relative ID. For retrieving resources relative to something, like a game.
        // Each instance of the ApiClient is tied to a specific resource, and retrieving
        // stuff is then mostly automatic.
        this.baseId = baseId
        this.baseName = baseName
    }

    setId(baseId: number): void {
        this.baseId = baseId
    }

    static fetch(resource: string, baseName: string, baseId = -1, options: Object = {}) {
        let client = new ApiClient(baseName, baseId)
        return client.retrieve(resource, options)
    }

    retrieve(resource: string = "list", options: Object = {}) {
        let reqParams = Object.assign(defaultOptions, options)

        const endpoint = this.getEndpoint(resource)
        const uri = typeof endpoint === 'function' ? endpoint(this.baseId) : endpoint

        return TokenService.token.then(token => axios({
            url: `${apiUrl}${this.baseName}/${uri}`,
            headers: { 'Authorization': 'Bearer ' + token },
            params: reqParams
        })).catch(this.handleErrors)
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
        list: 'index',
        get: (id: number) => `show/${id}`,
        series: (id: number) => `series/${id}`,
        videos: (id: number) => `videos/${id}`,
        creators: (id: number) => `creators/${id}`
    },
    video: {
        list: 'index',
        get: (id: number) => `show/${id}`,
        series: (id: number) => `series/${id}`,
        game: (id: number) => `game/${id}`,
        creator: (id: number) => `creator/${id}`
    },
    series: {
        list: 'index',
        get: (id: number) => `show/${id}`,
        videos: (id: number) => `videos/${id}`,
        creator: (id: number) => `creator/${id}`,
        game: (id: number) => `game/${id}`
    },
    creator: {
        list: 'index',
        get: (id: number) => `show/${id}`,
        videos: (id: number) => `videos/${id}`,
        series: (id: number) => `series/${id}`,
        games: (id: number) => `games/${id}`
    }
}