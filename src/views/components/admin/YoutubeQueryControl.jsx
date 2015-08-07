import React, { PropTypes } from 'react'
import AdminControl from './AdminControl.jsx'
import parsers from '../../../api/packageParsers'
import RadioField from '../../elements/RadioField.jsx'

class YoutubeQueryControl extends AdminControl {

    constructor() {
        super()

        this.state = {
            success: true,
            message: '',
            query: '',
            mode: "search"
        }
    }

    receivePackage(data) {
        let parser = parsers[this.props.resource]
        let contentPackage = parser(data)

        //ContentActions.importResults(contentPackage)

        this.setState({
            message: "Success",
            query: ""
        })
    }

    sendForm(e) {
        e.preventDefault()
        //AdminActions.clear()

        this.flow.query({
            query: this.state.query,
            resource: this.props.resource

        },`${this.state.mode}Content`, {

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
        //AdminActions.setResource(event.target.value)
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

                <h3>{this.state.mode} youtube content</h3>

                <div>{this.state.message}</div>

                <form onSubmit={ this.sendForm.bind(this) }>
                    <input type="text"
                           placeholder={this.state.mode === 'add' ? 'Resource id' : 'Query'}
                           value={ this.state.query }
                           onChange={ this.queryChangeHandler.bind(this) } />
                    <br />
                    <RadioField
                        selected={this.props.resource}
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

export default YoutubeQueryControl