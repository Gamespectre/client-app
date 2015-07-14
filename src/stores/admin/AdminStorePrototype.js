import AdminActions from '../../actions/admin/AdminActions'

class AdminStorePrototype {

    constructor() {
        this.bindActions(AdminActions)
    }
}

export default AdminStorePrototype