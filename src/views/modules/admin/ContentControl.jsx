import React from 'react'
import Radium from 'radium'
import YoutubeSearchContent from '../../components/admin/YoutubeQueryControl.jsx'
import YoutubePackageList from '../../components/admin/YoutubePackageList.jsx'
import { columns } from '../../../style/columns'

@Radium
class ContentControl extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div style={columns.wrapper}>
                <section style={columns.col('30%')}>
                    <YoutubeSearchContent />
                </section>
                <section style={columns.col('70%')}>
                    <h2>Query results:</h2>
                    <YoutubePackageList />
                </section>
            </div>
        )
    }
}

export default ContentControl