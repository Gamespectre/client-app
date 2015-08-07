import app from '../data/App'

class UserService {

    is(roleLevel) {
        if(app.user === false) return false

        return app.user.roles.some(role => {
            return role.level === roleLevel
        })
    }

    isnt(roleLevel) {
        if(app.user === false) return false

        return app.user.roles.every(role => {
            return role.level !== roleLevel
        })
    }
}

export default new UserService()