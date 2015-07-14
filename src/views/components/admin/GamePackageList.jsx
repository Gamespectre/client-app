import React from 'react'
import CheckboxItem from '../../elements/CheckboxItem.jsx'

class GamePackageList extends React.Component {

    constructor() {
        super()

        this.state = {
            selected: {}
        }
    }

    componentDidMount() {
        // Initialize checkboxes to chosen value
        let selected = {}
        this.props.resources.forEach(res => {
            selected[res.id] = true
        })

        this.setState({ selected: selected })
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

    render() {
        return (
            <div>
                <form onSubmit={this.saveSelected.bind(this)}>
                    <button type="submit">Save selected</button><br />
                    <button type="button" onClick={this.toggleAll.bind(this)}>Toggle all</button>
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