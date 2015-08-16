import user from '../data/items/user'
import App from '../data/App'

export default {

    loadUser(userData) {
        let userObj = user(userData)
        App['user'] = userObj

        return userObj
    }
}