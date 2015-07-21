import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import GameActions from '../../../actions/admin/GameActions'
import { game } from '../../../api/packageParsers'
import AdminActions from '../../../actions/admin/AdminActions'

class GameQueryControl extends AdminControl {

    constructor() {
        super()
    }

    receivePackage(data) {
        let gamePackage = game(data)
        GameActions.importGames(gamePackage)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        AdminActions.clear()

        this.flow.query(this.state.query, this.props.endpoint, {
            error: this.receiveError.bind(this),
            success: this.receivePackage.bind(this)
        })
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