import { user } from '../../api/packageParsers'

class User {

    constructor(data) {
        let userData = user(data)

        for(let key in userData) {
            if(!this.hasOwnProperty(key)) {
                this[key] = data[key]
            }
            else {
                console.error(`Key ${key} is already occupied!`)
            }
        }
    }

    is(roleName) {
        return this.roles.some(role => {
            return role.name === roleName
        })
    }

    isnt(roleName) {
        return this.roles.every(role => {
            return role.name !== roleName
        })
    }
}
export default User