import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import ContentActions from '../../../actions/admin/ContentActions'
import parsers from '../../../api/packageParsers'
import AdminActions from '../../../actions/admin/AdminActions'
import RadioField from '../../elements/RadioField.jsx'

class YoutubeSearchContent extends AdminControl {

    constructor() {
        super()

        this.state = {
            success: true,
            message: "",
            query: "",
            resource: 'playlist'
        }
    }

    receivePackage(data) {
        let parser = parsers[this.state.resource]
        let contentPackage = parser(data)

        switch(this.state.resource) {
            case 'playlist':
                ContentActions.importPlaylists(contentPackage)
                break
            case 'video':
                ContentActions.importVideos(contentPackage)
                break
            case 'channel':
                ContentActions.importCreators(contentPackage)
                break
            default:
                console.error("Uh oh, no actions found!")
                break
        }

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        AdminActions.clear()

        this.flow.query({
            query: this.state.query,
            resource: this.state.resource
        }, 'searchContent', {
            error: this.receiveError.bind(this),
            success: this.receivePackage.bind(this)
        })
    }

    queryChangeHandler(event) {
        this.setState({
            query: event.target.value
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
                           placeholder="query"
                           value={ this.state.query }
                           onChange={ this.queryChangeHandler.bind(this) } />
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

export default YoutubeSearchContent