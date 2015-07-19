import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ApiClient from '../../../api/ContentApiClient'
import EventsClient from '../../../api/PusherClient'
import ContentActions from '../../../actions/admin/ContentActions'
import PackageActions from '../../../actions/admin/PackageActions'
import { youtube, meta } from '../../../api/packageParsers'

class ContentQueryControl extends AdminControl {

    static propTypes = {
        method: PropTypes.string.isRequired
    }

    listener(data) {
        let packageMeta = meta(data)
        PackageActions.importPackage(packageMeta)

        ApiClient.request('packageData', { packageId: packageMeta.id }).then(response => {
            if(response.error) {
                return this.setState({
                    message: response.data.message,
                    query: ""
                })
            }

            let contentPackage = youtube(response.data)
            ContentActions.importPlaylists(contentPackage.playlists)
            ContentActions.importCreators(contentPackage.channels)
            ContentActions.importVideos(contentPackage.videos)

            this.setState({
                message: "Success",
                query: ""
            })
        })
    }

    sendForm(e) {
        e.preventDefault()
        ApiClient.request('addContent', { query: this.state.query, method: this.props.method })
        .then((response) => {
            if(response.status === 200) {
                this.subscribeTo(response.data.channel)
            }
        })
    }

    subscribeTo(channel) {
        let client = EventsClient.subscribe(channel)
        client.listen('PackageDone', this.listener.bind(this))
    }

    render() {

        return (
            <div className="admin-form">
                <div>{this.state.message}</div>
                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           value={ this.state.query }
                           onChange={ this.changeHandler.bind(this) } />
                    <br />
                    <button type="submit">Find</button>
                </form>
            </div>
        )
    }
}

export default ContentQueryControl