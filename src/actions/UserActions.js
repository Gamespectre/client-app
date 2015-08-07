import { user } from '../api/packageParsers'
import App from '../data/App'

export default {

    loadUser(userData) {
        App['user'] = user(userData)
    }
}