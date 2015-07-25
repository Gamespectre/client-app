import React from 'react'
import Radium from 'radium'
import GameQueryControl from '../../components/admin/GameQueryControl.jsx'
import GamePackageList from '../../components/admin/GamePackageList.jsx'
import { columns } from '../../../style/columns'

@Radium
class GameControl extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={columns.wrapper}>
                <section style={columns.col('30%')}>
                    <GameQueryControl />
                </section>
                <section style={columns.col('70%')}>
                    <h2>Query results:</h2>
                    <GamePackageList />
                </section>
            </div>
        )
    }
}

export default GameControl