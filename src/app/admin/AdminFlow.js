import EventsClient from '../../api/PusherClient'
import ApiClient from '../../api/ContentApiClient'
import PackageActions from '../../actions/admin/PackageActions'
import { meta } from '../../api/packageParsers'

const events = {
    queryStarted: 'PackageStarted',
    queryDone: 'PackageDataRetrieved',
    packageError: 'PackageError',
    packageSaved: 'PackageSaved',
    saveStarted: 'PackageSaveStarted',
    noResults: 'PackageEmpty'
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
                this.callbacks.error({message: response.error})
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
        this.callbacks = callbacks

        ApiClient.request('savePackage', {
            packageId: packageData.id,
            saveData: data
        }).then((response) => {
            if(response.status < 400) {
                this.client = EventsClient.subscribe(response.data.channel, events.packageSaved, this.saveListener.bind(this))
                this.client.listen(events.saveStarted, this.saveStartedListener.bind(this))
                this.client.listen(events.packageError, this.errorListener.bind(this))
                this.client.listen(events.noResults, this.errorListener.bind(this))
            }
            else {
                this.callbacks.error({message: "Save failed."})
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

    saveStartedListener(data) {
        console.log('Save started', data)
    }

    saveListener(data) {
        this.callbacks.success(data.data)

        this.client.unlisten(events.dataSaved)
        this.client.unlisten(events.saveStarted)
        this.client.unlisten(events.packageError)
        this.client.unlisten(events.noResults)
    }

    errorListener(data) {
        console.error(data)
        this.callbacks.error({message: data.error})

        this.client.unlisten(events.packageError)
        this.client.unlisten(events.noResults)
    }
}

export default AdminFlow