import React from 'react'
import CheckboxItem from '../../elements/CheckboxItem.jsx'
import EventsClient from '../../../api/PusherClient'
import ApiClient from '../../../api/ContentApiClient'
import AdminActions from '../../../actions/admin/AdminActions'

const initChecked = true

class ContentPackageList extends React.Component {

    constructor() {
        super()

        this.state = {
            selected: {},
            toggleAll: initChecked,
            message: "No data fetched yet!"
        }
    }

    componentWillReceiveProps(nextProps) {
        let selected = {}

        nextProps.content.playlists.forEach(resource => {
            selected[resource.id] = initChecked
        })

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: selected
            })
        })
    }

    setValue(e) {
        let id = e.target.value
        let newState = {}
        newState[id] = this.state.selected[id] ? false : true

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: newState
            })
        })
    }

    saveSelected(e) {
        e.preventDefault()
        ApiClient.request('savePackage', {
            packageId: this.props.package.id,
            saveData: this.state.selected,
            channel: this.props.package.channel
        })
        .then((response) => {
            if(response.status === 200) {
                this.subscribeTo(response.data.channel)
            }
        })
    }

    subscribeTo(channel) {
        let client = EventsClient.subscribe(channel)
        client.listen('PackageSaved', this.listener.bind(this))
    }

    listener(data) {
        AdminActions.clear()

        this.setState({
            message: data.data.message
        })
    }

    toggleAll(e) {
        let newState = {}
        let changeTo = this.state.toggleAll ? false : true

        for(let val in this.state.selected) {
            newState[val] = changeTo
        }

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: newState
            }),
            toggleAll: changeTo
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.saveSelected.bind(this)}>
                    <button type="submit">Save selected</button><br />
                    <p>
                        <label>
                            <input type="checkbox"
                                   checked={this.state.toggleAll}
                                   onChange={this.toggleAll.bind(this)} />
                            <span style={{paddingLeft: '1em'}}>Toggle all</span>
                        </label>
                    </p>
                    <ul>
                        {(() => {
                            let items = this.props.content.playlists.map(playlist => {
                                return <CheckboxItem checked={this.state.selected[playlist.id]}
                                                     key={playlist.id} {...playlist}
                                                     change={this.setValue.bind(this)} />
                            })

                            return items.length ? items : <li>{this.state.message}</li>
                        })()}
                    </ul>
                </form>
            </div>
        )
    }
}

export default ContentPackageList