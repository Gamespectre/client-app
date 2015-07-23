import { user } from '../api/packageParsers'
import { user as userValidate } from '../api/validate'

class UserService {

    constructor(userData) {
        this.user = userData
    }

    static create(data) {
        let userData = user(data)
        return userData
    }

    static init(userData) {
        let service = new UserService(userData)
        return service
    }

    is(roleLevel) {
        if(!userValidate(this.user)) return false

        return this.user.roles.some(role => {
            return role.level === roleLevel
        })
    }

    isnt(roleLevel) {
        if(!userValidate(this.user)) return false

        return this.user.roles.every(role => {
            return role.level !== roleLevel
        })
    }
}

export default UserService