import React from 'react'
import AdminGameItem from '../../elements/admin/AdminGameItem.jsx'
import { reactiveComponent } from 'mobservable-react'
import { makeReactive } from 'mobservable'
import contentQueryState from '../../../data/admin/contentQueryState'

const initChecked = false

@reactiveComponent
class GamePackageList extends React.Component {

    constructor() {
        super()

        this.listState = makeReactive({
            selected: [],
            toggleAll: initChecked
        })
    }

    saveSelected(e) {
        e.preventDefault()
        this.flow.save(this.listState.selected, {
            error: this.error.bind(this),
            success: this.done.bind(this)
        })
    }

    setValue(e) {
        let id = e.target.value

        let idx = this.listState.selected.indexOf(id)
        console.log(idx)
        if(idx === -1)
            this.listState.selected.push(id)
        else
            this.listState.selected.splice(idx, 1)
    }

    toggleAll(e) {
        this.listState.selected = contentQueryState.results.map(item => item.id)
        this.listState.toggleAll = !this.listState.toggleAll
    }

    render() {

        return (
            <div>
                <form onSubmit={this.saveSelected.bind(this)}>
                    <button type="submit">Save selected</button><br />
                    <p>
                        <label>
                            <input type="checkbox"
                                   checked={this.listState.toggleAll}
                                   onChange={this.toggleAll.bind(this)} />
                            <span style={{paddingLeft: '1em'}}>Toggle all</span>
                        </label>
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                        {contentQueryState.results.map(game => {
                            let checked = this.listState.selected.indexOf(game.id) !== -1

                            return (
                                <div key={game.id}>
                                    <AdminGameItem
                                        checked={checked}
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