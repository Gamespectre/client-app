import alt from '../flux'
import UserActions from '../actions/UserActions'

class UserStore {

    constructor() {

        this.state = {
            user: false
        }

        this.bindActions(UserActions)
    }

    loadUserData(data) {
        this.setState({
            user: data
        })
    }
}

export default alt.createStore(UserStore, 'userstore')