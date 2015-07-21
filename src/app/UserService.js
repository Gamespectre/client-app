import EventClient from '../api/PusherClient'
import axios from 'axios'
import { apiUrl } from '../api/ApiClient'
import UserActions from '../actions/UserActions'
import LocalCache from './LocalCache'

class UserService {

    constructor() {
        if(!__CLIENT__) {
            return false
        }

        this.token = this.getToken()
    }

    initialize() {
        this.fetchToken()
        return this
    }

    getToken() {
        return LocalCache.get('api_token')
    }

    setToken(token) {
        LocalCache.put('api_token', token)
        this.token = token
        return token
    }

    fetchToken() {
        if(this.token !== false) {
            axios.get(apiUrl + 'auth/token').then(response => {
                if(response.status < 400 && response.data.success === true) {
                    this.setToken(response.data.token)
                }
                else {
                    console.error("Token fetching failed.")
                }
            })
        }
    }

    loadUserData(data) {
        UserActions.loadUserData(data)
    }

    fetchUserData() {
        axios({
            headers: { 'Authorization': 'Bearer ' + this.token },
            url: apiUrl + 'auth/query',
            method: 'get'
        }).then(response => {
            if(response.status < 400 && response.data.success === true) {
                this.loadUserData({
                    user: response.data.user,
                    auth: response.data.auth
                })
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

                this.loadUserData({
                    user: data.data.user,
                    auth: data.data.auth
                })

                loginWindow.close()
                eventClient.unlisten('UserSignedIn')
            })
        })
    }
}

export default new UserService()