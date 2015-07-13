import React from 'react'
import AdminControl from './AdminControl.jsx'
import ApiClient from '../../../apiclient/ContentApiClient'
import EventsClient from '../../../apiclient/PusherClient'

class SearchGameControl extends AdminControl {

    constructor() {
        super()
    }

    listener(action) {
        return (data) => {
            action()

            this.setState({
                message: "Success",
                query: ""
            })
        }
    }

    sendForm(e) {
        e.preventDefault()
        ApiClient.send(request, { query: this.state[type].query })
            .then((response) => {
                this.broadcastListener(response.data.key, type, action)
            })
    }

    render() {

        return (
            <div className="admin-form">
                <h3>
                    Search game
                </h3>
                <div>{this.state.message}</div>
                <form onSubmit={this.sendForm.bind(this)}>
                    <input type="text"
                           value={this.state.query}
                           onChange={this.changeHandler.bind(this)} />
                    <br />
                    <button type="submit">Get</button>
                </form>
            </div>
        )
    }
}

export default SearchGameControl