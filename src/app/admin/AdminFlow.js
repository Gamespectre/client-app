import EventsClient from '../../api/PusherClient'
import ApiClient from '../../api/ContentApiClient'
import PackageActions from '../../actions/admin/PackageActions'
import { meta } from '../../api/packageParsers'

const events = {
    queryStarted: 'PackageStarted',
    queryDone: 'PackageDataRetrieved',
    packageError: 'PackageError',
    packageSaved: 'PackageSaved'
}

class AdminFlow {

    constructor() {
        this.callbacks = {}
        this.client = {}
    }

    /*
        Flow
     */

    query(requestData, endpoint, callbacks) {
        this.callbacks = callbacks

        ApiClient.request(endpoint, requestData)
        .then((response) => {
            if(response.status < 400) {
                this.client = EventsClient.subscribe(response.data.channel, events.queryDone, this.queryDoneListener.bind(this))
                this.client.listen(events.packageError, this.errorListener.bind(this))
                this.client.listen(events.queryStarted, this.queryStartedListener.bind(this))
            }
            else {
                this.callbacks.error({message: "Query failed."})
            }
        })
    }

    fetchPackage(id) {
        ApiClient.request('packageData', {packageId: id})
        .then(response => {
            if (response.error) {
                this.callbacks.error({message: response.data.message})
            }
            if(response.status > 399) {
                this.callbacks.error({message: "Fetching data failed."})
            }
            else {
                this.callbacks.success(response.data.data)
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
                this.client = EventsClient.subscribe(response.data.channel, events.dataSaved, this.saveListener.bind(this))
                this.client.listen(events.packageError, this.errorListener.bind(this))
            }
            else {
                this.saveCallbacks.error({message: "Save failed."})
            }
        })
    }

    /*
        Listeners
     */

    queryDoneListener(data) {
        let packageMeta = meta(data)
        PackageActions.importPackage(packageMeta)

        this.fetchPackage(packageMeta.id)

        this.client.unlisten(events.queryDone)
        this.client.unlisten(events.queryStarted)
    }

    queryStartedListener(data) {
        console.log('Query started', data)
    }

    saveListener(data) {
        this.saveCallbacks.success(data.data)
        this.client.unlisten(events.dataSaved)
    }

    errorListener(data) {
        console.error(data)
        this.saveCallbacks.error({message: data.data.message})
    }
}

export default AdminFlow