import React from 'react'
import Radium from 'radium'
import AddGameControl from '../../components/admin/AddGameControl.jsx'
import SearchGameControl from '../../components/admin/SearchGameControl.jsx'
import GameListControl from '../../components/admin/GameListControl.jsx'
import { columns } from '../../../style/columns'

@Radium
class GameControl extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={columns.wrapper}>
                <section style={columns.col('50%')}>
                    <AddGameControl />
                    <SearchGameControl />
                </section>
                <section style={columns.col('50%')}>
                    <GameListControl />
                </section>
            </div>
        )
    }
}

export default GameControl