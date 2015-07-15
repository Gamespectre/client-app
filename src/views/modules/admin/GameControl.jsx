import React from 'react'
import Radium from 'radium'
import GameQueryControl from '../../components/admin/GameQueryControl.jsx'
import AltContainer from 'alt/AltContainer'
import GamePackageList from '../../components/admin/GamePackageList.jsx'
import GameAdminStore from '../../../stores/admin/GameAdminStore'
import PackageAdminStore from '../../../stores/admin/PackageAdminStore'
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
                    41484
                    <h3>Add game</h3>
                    <GameQueryControl method="get" />

                    <h3>Search game</h3>
                    <GameQueryControl method="search" />
                </section>
                <section style={columns.col('70%')}>
                    <h2>Query results:</h2>
                    <AltContainer stores={{
                        resources(props) {
                            return {
                                store: GameAdminStore,
                                value: GameAdminStore.getState().games
                            }
                        },
                        package(props) {
                            return {
                                store: PackageAdminStore,
                                value: PackageAdminStore.getState().package
                            }
                        }
                    }}>
                        <GamePackageList />
                    </AltContainer>
                </section>
            </div>
        )
    }
}

export default GameControl