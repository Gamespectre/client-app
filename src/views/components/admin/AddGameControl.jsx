import React from 'react'
import AdminControl from './AdminControl.jsx'
import ApiClient from '../../../apiclient/ContentApiClient'
import EventsClient from '../../../apiclient/PusherClient'
import ContentAdminActions from '../../../actions/admin/ContentAdminActions'

class AddGameControl extends AdminControl {

    listener(data) {
        console.log(data)
        ContentAdminActions.setCandidates(data.data.game)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        ApiClient.request('addGame', { query: this.state.query })
        .then((response) => {
            this.subscribeTo(response.data.key)
        })
    }

    subscribeTo(channel) {
        let client = EventsClient.subscribe(channel)
        client.listen('PackageDone', this.listener.bind(this))
    }

    render() {

        return (
            <div className="admin-form">
                <h3>
                    Add game (Giant bomb id)
                </h3>
                <div>{this.state.message}</div>
                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           value={ this.state.query }
                           onChange={ this.changeHandler.bind(this) } />
                    <br />
                    <button type="submit">Get</button>
                </form>
            </div>
        )
    }
}

export default AddGameControl