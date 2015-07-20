import React from 'react'
import CheckboxItem from '../../elements/CheckboxItem.jsx'
import AdminList from './AdminList.jsx'

const initChecked = false

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
        let selected = {}

        nextProps.resources.forEach(resource => {
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
                            let items = this.props.resources.map(game => {
                                return <CheckboxItem checked={this.state.selected[game.id]}
                                                     key={game.id} {...game}
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

export default GamePackageList