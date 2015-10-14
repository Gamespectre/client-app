import axios from 'axios'
import TokenService from '../app/TokenService'
import apiconfig from '../apiconfig'

const apiUrl = apiconfig.internal

class ContentApiClient {

    static request(method: string, data: Object) {
        let client = new ContentApiClient()
        return client.requestFor(method, data)
    }

    requestFor(method: string, options: Object) {
        const endpoint = this.getEndpoint(method)

        return TokenService.token.then(token => axios({
            url: `${apiUrl}admin/${endpoint}`,
            data: options,
            method: 'post',
            headers: { 'Authorization': 'Bearer ' + token }
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
        const endpoint = endpoints[resource]
        if(typeof endpoint === 'undefined') throw new ReferenceError("The resource you requested is not valid.")
        return endpoint
    }
}

export default ContentApiClient

export const endpoints = {
    // Retrievers
    addGame: 'add-game',
    searchGame: 'search-game',
    addContent: 'add-content',
    searchContent: 'search-content',

    // Package API
    packageData: 'get-package-data',

    // Savers
    savePackage: 'save-package'
}