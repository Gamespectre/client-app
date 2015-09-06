import axios from 'axios'
import app from '../data/app'
import apiconfig from '../apiconfig'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class TokenService {

    constructor() {
        this.token = this.fetchToken.bind(this)
    }

    fetchToken() {
        return axios.get(apiUrl + 'auth/token').then(response => {
            if(response.status < 400 && response.data.success === true) {
                return app.token = response.data.token
            }
            else return "no token"
        })
    }
}

export default new TokenService()