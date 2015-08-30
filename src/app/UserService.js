import app from '../data/App'
import user from '../data/items/user'
import axios from 'axios'
import apiconfig from '../apiconfig'
import TokenService from './TokenService'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class UserService {

    fetchUserData() {
        return TokenService.token.then(token => axios({
            headers: { 'Authorization': 'Bearer ' + token },
            url: apiUrl + 'auth/query',
            method: 'get'
        })).then(response => {
            if(response.status < 400 && response.data.success === true) {
                app.user = user(response.data.user)
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
            app.user = user(e.data.user)
            loginWindow.close()

            window.removeEventListener('message', receiveEvent)
        }

        window.addEventListener('message', receiveEvent, false)
    }

    is(roleLevel) {
        if(app.user === false) return false

        return app.user.roles.some(role => {
            return role.level === roleLevel
        })
    }

    isnt(roleLevel) {
        if(app.user === false) return false

        return app.user.roles.every(role => {
            return role.level !== roleLevel
        })
    }
}

export default new UserService()