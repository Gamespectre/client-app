import EventsClient from '../../api/PusherClient'
import ApiClient from '../../api/ContentApiClient'
import contentQueryState from '../../data/admin/contentQueryState'

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

                console.log(response.data)
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

    save(data, callbacks) {
        this.callbacks = callbacks

        ApiClient.request('savePackage', {
            packageId: contentQueryState.package.id,
            saveData: data
        }).then((response) => {
            if(response.status < 400 && response.data.success === true) {
                this.callbacks.success(data.data)
            }
            else {
                this.callbacks.error({message: "Save failed."})
            }
        })
    }

    createPackageData(raw) {
        return {
            id: raw.id,
            channel: raw.channel
        }
    }

    /*
        Listeners
     */

    queryDoneListener(data) {
        contentQueryState.package = this.createPackageData(data)
        this.fetchPackage(contentQueryState.package.id)

        this.client.unlisten(events.queryDone)
        this.client.unlisten(events.queryStarted)
    }

    queryStartedListener(data) {
        console.log('Query started', data)
    }

    errorListener(data) {
        console.error(data)
        this.callbacks.error({message: data.error})

        this.client.unlisten(events.packageError)
        this.client.unlisten(events.noResults)
    }
}

export default new AdminFlow()