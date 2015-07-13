import axios from 'axios'
import apiconfig from '../apiconfig'

const apiUrl = 'http://localhost:3000/api/'

class ApiClient {

    constructor() {

    }

    static request(method: string, data: Object) {
        let client = new ApiClient()
        return client.requestFor(method, data)
    }

    requestFor(method: string, options: Object) {
        const endpoint = this.getEndpoint(method)
        return axios.post(`${apiUrl}admin/${endpoint}`, options).catch(this.handleErrors)
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
        const endpoint = endpoints[resource]
        if(typeof endpoint === 'undefined') throw new ReferenceError("The resource you requested is not valid.")
        return endpoint
    }
}

export default ApiClient

export const endpoints = {
    addGame: 'add-game',
    addContent: 'game-content'
}