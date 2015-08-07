import React from 'react'
import AdminGameItem from '../../elements/admin/AdminGameItem.jsx'
import AdminList from './AdminList.jsx'
import ListMessage from './ListMessage.jsx'
import Radium from 'radium'

const initChecked = false

@Radium
class GamePackageList extends AdminList {

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
                message: "No new games found!"
            })
        }

        let selected = {}

        nextProps.content.results.forEach(resource => {
            if(resource !== false) {
                selected[resource.id] = initChecked
            }
        })

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: selected
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
                    <ul style={{ listStyle: 'none' }}>
                        {this.props.content.results.map(game => {
                            return (
                                <div key={game.id}>
                                    <AdminGameItem
                                        checked={this.state.selected[game.id]}
                                        type="game"
                                        {...game}
                                        change={this.setValue.bind(this)} />
                                </div>
                            )
                        })}
                    </ul>
                </form>
            </div>
        )
    }
}

export default GamePackageList