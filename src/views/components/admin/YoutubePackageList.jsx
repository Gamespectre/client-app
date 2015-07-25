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
class YoutubePackageList extends AdminList {

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
            success: true,
            selected: {},
            toggleAll: initChecked,
            message: "No data fetched yet!"
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.content.results.length === 0) {
            this.setState({
                message: "No new content found!"
            })
        }
        else {
            let selected = {}

            nextProps.content.results.forEach(resource => {
                selected[resource.id] = {
                    game: "",
                    chosen: initChecked
                }
            })

            this.setState({
                selected: React.addons.update(this.state.selected, {
                    $merge: selected
                })
            })
        }
    }

    saveSelected(e) {
        e.preventDefault()
        this.flow.save(this.state.selected, this.props.package, {
            error: this.error.bind(this),
            success: this.done.bind(this)
        })
    }

    setValue(e) {
        let id = e.target.value
        let newState = {}
        let current = this.state.selected[id]

        newState[id] = {
            game: current.game,
            chosen: current.chosen === true ? false : true
        }

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: newState
            })
        })
    }

    // Yay for code duplication
    setProp(id) {
        return (e) => {
            let value = e.target.value
            let newState = {}
            let current = this.state.selected[id]

            newState[id] = {
                game: value,
                chosen: current.chosen
            }

            this.setState({
                selected: React.addons.update(this.state.selected, {
                    $merge: newState
                })
            })
        }
    }

    toggleAll(e) {
        let newState = {}
        let changeTo = this.state.toggleAll ? false : true

        for(let val in this.state.selected) {
            newState[val] = {
                game: this.state.selected[val].game,
                chosen: changeTo
            }
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
                        {this.props.content.results.map(result => {
                            return (
                                <div key={result.id} >
                                    <AdminPlaylistItem
                                        type={this.props.content.resource}
                                        state={this.state.selected[result.id]}
                                        check={this.setValue.bind(this)}
                                        setGame={this.setProp(result.id)}
                                        {...result} />
                                </div>
                            )
                        })}
                    </article>
                </form>
            </div>
        )
    }
}

export default YoutubePackageList