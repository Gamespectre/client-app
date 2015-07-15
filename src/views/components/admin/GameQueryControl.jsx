import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ApiClient from '../../../api/ContentApiClient'
import EventsClient from '../../../api/PusherClient'
import GameActions from '../../../actions/admin/GameActions'
import PackageActions from '../../../actions/admin/PackageActions'
import { game } from '../../../api/packageParsers'

class GameQueryControl extends AdminControl {

    static propTypes = {
        method: PropTypes.string.isRequired
    }

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
        ApiClient.request('addGame', { query: this.state.query, method: this.props.method })
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
                    <button type="submit">Get</button>
                </form>
            </div>
        )
    }
}

export default GameQueryControl