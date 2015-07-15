import React from 'react'
import CheckboxItem from '../../elements/CheckboxItem.jsx'

const initChecked = true

class GamePackageList extends React.Component {

    constructor() {
        super()

        this.state = {
            selected: {},
            toggleAll: initChecked
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

    saveSelected(e) {
        e.preventDefault()

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
                        {this.props.resources.map(game => {
                            return <CheckboxItem checked={this.state.selected[game.id]}
                                                 key={game.id} {...game}
                                                 change={this.setValue.bind(this)} />
                        })}
                    </ul>
                </form>
            </div>
        )
    }
}

export default GamePackageList