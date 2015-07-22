import EventClient from '../api/PusherClient'
import axios from 'axios'
import { apiUrl } from '../api/ApiClient'
import UserActions from '../actions/UserActions'

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
        // Parses string by removing 'Bearer '
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
                this.parseToken(response.headers.authorization)
                UserActions.loadUserData(response.data.user)
            }
            else {
                console.error("Token query failed.")
            }
        })
    }

    authenticate() {
        axios.get(apiUrl + 'auth/init').then(response => {
            let channel = response.data.channel
            let loginWindow = window.open(apiUrl + 'auth/youtube', '_blank', 'width=600,height=400')

            let eventClient = new EventClient(channel)

            eventClient.listen('UserSignedIn', (data) => {
                this.setToken(data.data.token)
                UserActions.loadUserData(data.data.user)

                loginWindow.close()
                eventClient.unlisten('UserSignedIn')
            })
        })
    }
}

export default new AuthService()