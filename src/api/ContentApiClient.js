import axios from 'axios'
import AuthService from '../app/AuthService'
import apiconfig from '../apiconfig'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class ApiClient {

    constructor() {

    }

    static request(method: string, data: Object) {
        let client = new ApiClient()
        return client.requestFor(method, data)
    }

    requestFor(method: string, options: Object) {
        const endpoint = this.getEndpoint(method)
        const token = AuthService.getToken()

        return axios({
            url: `${apiUrl}admin/${endpoint}`,
            data: options,
            method: 'post',
            headers: { 'Authorization': 'Bearer ' + token }
        }).catch(this.handleErrors)
    }

    interceptToken(response) {
        AuthService.parseToken(response.headers.authorization)
        return response
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
    // Retrievers
    addGame: 'add-game',
    searchGame: 'search-game',
    addContent: 'game-content',

    // Package API
    packageData: 'get-package-data',

    // Savers
    savePackage: 'save-package'
}