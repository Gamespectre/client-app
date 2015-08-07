import React from 'react'
import YoutubeResourceItem from '../../elements/admin/YoutubeResourceItem.jsx'
import AdminList from './AdminList.jsx'
import ListMessage from './ListMessage.jsx'
import { adminList as style } from '../../../style/components/adminList'
import Radium from 'radium'

const initChecked = true

@Radium
class YoutubePackageList extends AdminList {

    constructor() {
        super()

        this.state = {
            success: true,
            selected: {},
            toggleAll: initChecked,
            message: "No data fetched yet!",
            game: ""
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

    setGlobalGame(e) {
        let value = e.target.value
        let newState = {}

        for(let val in this.state.selected) {
            newState[val] = {
                game: value,
                chosen: this.state.selected[val].chosen
            }
        }

        this.setState({
            selected: React.addons.update(this.state.selected, {
                $merge: newState
            }),
            game: value
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
                        <br />
                        <label>
                            Set game for all: <input type="text"
                                                     value={this.state.game}
                                                     onChange={this.setGlobalGame.bind(this)} />
                        </label>
                    </p>
                    <article style={ style.list }>
                        {this.props.content.results.map(result => {
                            return (
                                <div key={result.id} >
                                    <YoutubeResourceItem
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