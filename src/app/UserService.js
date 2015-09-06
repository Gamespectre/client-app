import axios from 'axios'
import apiconfig from '../apiconfig'
import app from '../data/app'
import { makeReactive } from 'mobservable'

const apiUrl = __DEV__ ? apiconfig.dev.internal : apiconfig.prod.internal

class UserService {

    fetchUserData(token) {
        return axios({
            headers: { 'Authorization': 'Bearer ' + token },
            url: apiUrl + 'auth/query',
            method: 'get'
        }).then(({ data }) => {
            app.user = this.setUser(data.user)
        })
    }

    setUser(data: Object) {
        return {
            name: data.name === "Anonymous" ? false : data.name,
            avatar: data.avatar,
            registered: data.created_at,
            googleId: data.google_id,
            userId: data.id,
            roles: data.roles.map(role => {
                return {
                    role: role.name,
                    level: role.level
                }
            })
        }
    }

    authenticate() {
        let loginWindow = window.open(apiUrl + 'auth/youtube', '_blank', 'width=600,height=400')

        var receiveEvent = (e) => {
            if(e.origin !== location.origin) return false
            if(e.data.success !== true) return false

            app.user = this.setUser(e.data.user)
            loginWindow.close()

            window.removeEventListener('message', receiveEvent)
        }

        window.addEventListener('message', receiveEvent, false)
    }

    is(roleLevel) {
        if(!app.user) return false

        return app.user.roles.some(role => {
            return role.level === roleLevel
        })
    }

    isnt(roleLevel) {
        if(!app.user) return false

        return app.user.roles.every(role => {
            return role.level !== roleLevel
        })
    }
}

export default new UserService()