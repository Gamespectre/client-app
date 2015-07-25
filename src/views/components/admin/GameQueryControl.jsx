import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ContentActions from '../../../actions/admin/ContentActions'
import { game } from '../../../api/packageParsers'
import AdminActions from '../../../actions/admin/AdminActions'

class GameQueryControl extends AdminControl {

    constructor() {
        super()

        this.state = {
            success: true,
            message: "",
            query: "",
            mode: 'search'
        }
    }

    receivePackage(data) {
        let gamePackage = game(data)
        console.log(gamePackage)
        ContentActions.importResults(gamePackage)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        AdminActions.clear()

        this.flow.query({query: this.state.query}, `${this.state.mode}Game`, {
            error: this.receiveError.bind(this),
            success: this.receivePackage.bind(this)
        })
    }

    queryChangeHandler(event) {
        this.setState({
            query: event.target.value
        })
    }

    setMode(mode) {
        return (e) => {
            e.preventDefault()

            this.setState({
                mode: mode
            })
        }
    }

    render() {

        return (
            <div className="admin-form">
                <a href="#" onClick={this.setMode('add')}>Add</a>&nbsp;
                <a href="#" onClick={this.setMode('search')}>Search</a>

                <h3>{this.state.mode} game</h3>

                <div>{this.state.message}</div>

                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           value={ this.state.query }
                           onChange={ this.queryChangeHandler.bind(this) } />
                    <br />
                    <button type="submit">Get</button>
                </form>
            </div>
        )
    }
}

export default GameQueryControl