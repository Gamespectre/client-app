import user from '../data/items/user'
import App from '../data/App'

export default {

    loadUser(userData) {
        App['user'] = user(userData)
    }
}