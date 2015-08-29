import axios from 'axios'
import apiconfig from '../apiconfig'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class TokenService {

    constructor() {
        this.token = false
        this.ready = this.initialize()
    }

    initialize() {
        return this.fetchToken()
    }

    getToken() {
        return this.token
    }

    setToken(token) {
        return this.token = token
    }

    fetchToken() {
        return axios.get(apiUrl + 'auth/token').then(response => {
            if(response.status < 400 && response.data.success === true) {
                return this.setToken(response.data.token)
            }
            else {
                console.error("Token fetching failed.")
                return "Token fetch failed"
            }
        })
    }
}

export default new TokenService()