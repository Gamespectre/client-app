import EventClient from '../api/PusherClient'
import axios from 'axios'
import UserActions from '../actions/UserActions'
import apiconfig from '../apiconfig'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class AuthService {

    constructor() {
        this.token = false
        this.ready = this.initialize()
    }

    initialize() {
        return this.fetchToken().then(this.fetchUserData.bind(this))
    }

    getToken() {
        return this.token
    }

    setToken(token) {
        this.token = token
        return token
    }

    fetchToken() {
        return axios.get(apiUrl + 'auth/token').then(response => {
            if(response.status < 400 && response.data.success === true) {
                this.setToken(response.data.token)
            }
            else {
                console.error("Token fetching failed.")
            }
        })
    }

    parseToken(authHeader) {
        let token = authHeader.slice(7);
        this.setToken(token)
        return token
    }

    fetchUserData() {
        return axios({
            headers: { 'Authorization': 'Bearer ' + this.token },
            url: apiUrl + 'auth/query',
            method: 'get'
        }).then(response => {
            if(response.status < 400 && response.data.success === true) {
                UserActions.loadUserData(response.data.user)
            }
            else {
                console.error("Token query failed.")
            }
        })
    }

    authenticate() {
        let loginWindow = window.open(apiUrl + 'auth/youtube', '_blank', 'width=600,height=400')

        var receiveEvent = (e) => {
            if(e.origin !== location.origin) return false
            if(e.data.success !== true) return false

            this.setToken(e.data.token)
            UserActions.loadUserData(e.data.user)
            loginWindow.close()

            window.removeEventListener('message', receiveEvent)
        }

        window.addEventListener('message', receiveEvent, false)
    }
}

export default new AuthService()