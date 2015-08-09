import React from 'react'
import GameQueryControl from '../../components/admin/GameQueryControl.jsx'
import GamePackageList from '../../components/admin/GamePackageList.jsx'

class GameControl extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <section>
                    <GameQueryControl />
                </section>
                <section>
                    <h2>Query results:</h2>
                    <GamePackageList />
                </section>
            </div>
        )
    }
}

export default GameControl