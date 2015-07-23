import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ContentActions from '../../../actions/admin/ContentActions'
import { youtube } from '../../../api/packageParsers'
import AdminActions from '../../../actions/admin/AdminActions'
import RadioField from '../../elements/RadioField.jsx'

class YoutubeAddContent extends AdminControl {

    constructor() {
        super()

        this.state = {
            success: true,
            message: "",
            resourceId: "",
            game: null,
            resource: 'playlist'
        }
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
        AdminActions.clear()

        this.flow.query({
            resourceId: this.state.resourceId,
            game: this.state.game,
            resource: this.state.resource
        }, {
            error: this.receiveError.bind(this),
            success: this.receivePackage.bind(this)
        })
    }

    idChangeHandler(event) {
        this.setState({
            resourceId: event.target.value
        })
    }

    gameChangeHandler(event) {
        this.setState({
            game: event.target.value
        })
    }

    resourceChangeHandler(event) {
        this.setState({
            resource: event.target.value
        })
    }

    render() {

        return (
            <div className="admin-form">
                <div>{this.state.message}</div>
                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           placeholder="game id"
                           value={ this.state.game }
                           onChange={ this.gameChangeHandler.bind(this) } />
                    <br />
                    <input type="text"
                           placeholder="Resource id"
                           value={ this.state.resourceId }
                           onChange={ this.idChangeHandler.bind(this) } />
                    <br />
                    <RadioField
                        selected={this.state.resource}
                        name="resource"
                        onChange={this.resourceChangeHandler.bind(this)}
                        inputs={[
                            { value: 'playlist', label: 'Playlist' },
                            { value: 'video', label: 'Video' },
                            { value: 'channel', label: 'Channel' },
                        ]}/>
                    <br />
                    <button type="submit">Find</button>
                </form>
            </div>
        )
    }
}

export default YoutubeAddContent