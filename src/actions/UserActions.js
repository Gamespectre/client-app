import alt from '../flux'

class UserActions {

    constructor() {
        this.generateActions('loadUserData')
    }
}

export default alt.createActions(UserActions)