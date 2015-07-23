import alt from '../flux'
import UserService from '../app/UserService'

class UserActions {

    constructor() {}

    loadUserData(userData) {
        let data = UserService.create(userData)
        this.dispatch(data)
    }
}

export default alt.createActions(UserActions)