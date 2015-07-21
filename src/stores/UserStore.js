import alt from '../flux'
import UserActions from '../actions/UserActions'

class UserStore {

    constructor() {

        this.state = {
            user: false,
            auth: 'anon'
        }

        this.bindActions(UserActions)
    }

    loadUserData(data) {
        this.setState(data)
    }
}

export default alt.createStore(UserStore, 'userstore')