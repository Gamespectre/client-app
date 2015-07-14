import alt from '../../flux'

class PackageActions {

    constructor() {

    }

    importPackage(data) {
        let packageDef = {
            id: data.id,
            channel: data.channel,
            query: data.query
        }

        this.dispatch(packageDef)
    }
}

export default alt.createActions(PackageActions)