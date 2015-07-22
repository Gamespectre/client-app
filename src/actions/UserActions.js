import alt from '../flux'
import User from '../app/objects/User'

class UserActions {

    constructor() {

    }

    loadUserData(userData) {
        let data = new User(userData)
        this.dispatch(data)
    }
}

export default alt.createActions(UserActions)