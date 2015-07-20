import EventsClient from '../../api/PusherClient'
import ApiClient from '../../api/ContentApiClient'
import PackageActions from '../../actions/admin/PackageActions'
import { meta } from '../../api/packageParsers'

const events = {
    queryDone: 'PackageDone',
    dataSaved: 'PackageSaved'
}

class AdminFlow {

    constructor() {
        this.queryCallbacks = {}
        this.saveCallbacks = {}
    }

    /*
        Flow
     */

    query(query, endpoint, callbacks) {
        this.queryCallbacks = callbacks

        ApiClient.request(endpoint, { query: query })
        .then((response) => {
            if(response.status < 400) {
                EventsClient.subscribe(response.data.channel, events.queryDone, this.queryListener.bind(this))
            }
            else {
                this.queryCallbacks.error({message: "Query failed."})
            }
        })
    }

    fetchPackage(id) {
        ApiClient.request('packageData', {packageId: id})
        .then(response => {
            if (response.error) {
                this.queryCallbacks.error({message: response.data.message})
            }
            if(response.status > 399) {
                this.queryCallbacks.error({message: "Fetching data failed."})
            }
            else {
                this.queryCallbacks.success(response.data)
            }
        })
    }

    save(data, packageData, callbacks) {
        this.saveCallbacks = callbacks

        ApiClient.request('savePackage', {
            packageId: packageData.id,
            saveData: data,
            channel: packageData.channel
        }).then((response) => {
            if(response.status < 400) {
                let client = EventsClient.subscribe(response.data.channel, events.dataSaved, this.saveListener.bind(this))
                client.listen('PackageSaveFailed', this.errorListener.bind(this))
            }
            else {
                this.saveCallbacks.error({message: "Save failed."})
            }
        })
    }

    /*
        Listeners
     */

    queryListener(data) {
        let packageMeta = meta(data)
        PackageActions.importPackage(packageMeta)
        this.fetchPackage(packageMeta.id)
    }

    saveListener(data) {
        this.saveCallbacks.success(data.data)
    }

    errorListener(data) {
        console.log(data)
        this.saveCallbacks.error({message: data.data.message})
    }
}

export default AdminFlow