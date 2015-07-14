import React from 'react'
import AdminControl from './AdminControl.jsx'
import ApiClient from '../../../apiclient/ContentApiClient'
import EventsClient from '../../../apiclient/PusherClient'
import GameActions from '../../../actions/admin/GameActions'
import PackageActions from '../../../actions/admin/PackageActions'
import { game } from '../../../apiclient/packageParsers'

class AddGameControl extends AdminControl {

    listener(data) {
        let gamePackage = game(data.data)

        GameActions.importGames(gamePackage)
        PackageActions.importPackage(gamePackage)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        ApiClient.request('addGame', { query: this.state.query })
        .then((response) => {
            this.subscribeTo(response.data.channel)
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