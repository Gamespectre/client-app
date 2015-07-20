import React from 'react'
import CheckboxItem from '../../elements/CheckboxItem.jsx'
import AdminList from './AdminList.jsx'
import ListMessage from './ListMessage.jsx'

const initChecked = true

class ContentPackageList extends AdminList {

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
        this.flow.save(this.state.selected, this.props.package, {
            error: this.error.bind(this),
            success: this.done.bind(this)
        })
    }

    done(data) {
        AdminActions.clear()

        this.setState({
            success: true,
            message: data.message
        })
    }

    error(data) {
        this.setState({
            success: false,
            message: data.message
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

                            return items.length ? items : <ListMessage message={this.state.message} />
                        })()}
                    </ul>
                </form>
            </div>
        )
    }
}

export default ContentPackageList