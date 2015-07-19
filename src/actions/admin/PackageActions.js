import alt from '../../flux'

class PackageActions {

    constructor() {

    }

    importPackage(data) {
        this.dispatch(data)
    }
}

export default alt.createActions(PackageActions)