import React from 'react'
import AdminPlaylistItem from '../../elements/AdminPlaylistItem.jsx'
import AdminList from './AdminList.jsx'
import ListMessage from './ListMessage.jsx'
import { adminList as style } from '../../../style/components/adminList'
import Radium from 'radium'
import connectToStores from 'alt/utils/connectToStores'
import ContentAdminStore from '../../../stores/admin/ContentAdminStore'
import PackageAdminStore from '../../../stores/admin/PackageAdminStore'

const initChecked = true

@Radium
@connectToStores
class ContentPackageList extends AdminList {

    static getStores() {
        return [ContentAdminStore, PackageAdminStore];
    }

    static getPropsFromStores() {
        return {
            content: ContentAdminStore.getState(),
            package: PackageAdminStore.getState()
        }
    }

    constructor() {
        super()

        this.state = {
            selected: {},
            toggleAll: initChecked,
            message: "No data fetched yet!"
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.content.playlists.length === 0) {
            this.setState({
                message: "No new content found!"
            })
        }
        else {
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
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.content.playlists.length !== 0
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
                    <article style={ style.list }>
                        {this.props.content.playlists.map(playlist => {
                            return (
                                <AdminPlaylistItem
                                    key={playlist.id}
                                    creator={
                                        this.props.content.creators.filter(creator => {
                                            return creator.id === playlist.channel
                                        })[0]
                                    }
                                    checked={this.state.selected[playlist.id]}
                                    change={this.setValue.bind(this)}
                                    {...playlist} />
                            )
                        })}
                    </article>
                </form>
            </div>
        )
    }
}

export default ContentPackageList