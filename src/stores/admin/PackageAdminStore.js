import alt from '../../flux'
import PackageActions from '../../actions/admin/PackageActions'
import AdminStorePrototype from './AdminStorePrototype'

class PackageAdminStore extends AdminStorePrototype {

    constructor() {
        super()

        this.state = {
            id: "",
            channel: ""
        }

        this.bindActions(PackageActions)
    }

    importPackage(packageData) {
        this.setState(packageData)
    }

    clear() {
        this.setState({
            id: "",
            channel: ""
        })
    }
}

export default alt.createStore(PackageAdminStore, 'packageadminstore')