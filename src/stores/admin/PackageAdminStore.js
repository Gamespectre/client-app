import alt from '../../flux'
import PackageActions from '../../actions/admin/PackageActions'
import AdminStorePrototype from './AdminStorePrototype'

class PackageAdminStore extends AdminStorePrototype {

    constructor() {
        super()

        this.state = {
            package: {}
        }

        this.bindActions(PackageActions)
    }

    importPackage(packageData) {
        this.setState({
            package: packageData
        })
    }

    clear() {
        this.setState({
            package: {}
        })
    }
}

export default alt.createStore(PackageAdminStore, 'packageadminstore')