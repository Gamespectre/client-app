import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ContentActions from '../../../actions/admin/ContentActions'
import { youtube } from '../../../api/packageParsers'

class YoutubeQueryControl extends AdminControl {

    constructor() {
        super()
    }

    receivePackage(data) {
        let contentPackage = youtube(data)
        ContentActions.importPlaylists(contentPackage.playlists)
        ContentActions.importCreators(contentPackage.channels)
        ContentActions.importVideos(contentPackage.videos)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        this.flow.query(this.state.query, 'addContent', {
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
                    <button type="submit">Find</button>
                </form>
            </div>
        )
    }
}

export default YoutubeQueryControl