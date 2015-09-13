import React, { PropTypes } from 'react'
import { reactiveComponent } from 'mobservable-react'
import game from '../../../data/items/game'
import contentQueryState from '../../../data/admin/contentQueryState'
import AdminFlow from '../../../app/admin/AdminFlow'

@reactiveComponent
class GameQueryControl extends React.Component {

    constructor() {
        super()
    }

    receivePackage(data) {
        contentQueryState.results = data.map(item => game(item))
    }

    sendForm(e) {
        e.preventDefault()

        AdminFlow.query({query: contentQueryState.query}, `${contentQueryState.mode}Game`, {
            error: this.receiveError.bind(this),
            success: this.receivePackage.bind(this)
        })
    }

    queryChangeHandler(event) {
        contentQueryState.query = event.target.value
    }

    setMode(mode) {
        return (e) => {
            e.preventDefault()
            contentQueryState.mode = mode
        }
    }

    receiveError(err) {
        console.error(err)
    }

    render() {

        return (
            <div className="admin-form">
                <a href="#" onClick={this.setMode('add')}>Add</a>&nbsp;
                <a href="#" onClick={this.setMode('search')}>Search</a>

                <h3>{contentQueryState.mode} game</h3>

                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           value={ contentQueryState.query }
                           onChange={ this.queryChangeHandler.bind(this) } />
                    <button type="submit">Get</button>
                </form>
            </div>
        )
    }
}

export default GameQueryControl