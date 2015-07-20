import React from 'react'
import Radium from 'radium'
import YoutubeQueryControl from '../../components/admin/YoutubeQueryControl.jsx'
import AltContainer from 'alt/AltContainer'
import YoutubePackageList from '../../components/admin/YoutubePackageList.jsx'
import ContentAdminStore from '../../../stores/admin/ContentAdminStore'
import PackageAdminStore from '../../../stores/admin/PackageAdminStore'
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
                    <h3>Search content for game id</h3>
                    <YoutubeQueryControl />
                </section>
                <section style={columns.col('70%')}>
                    <h2>Query results:</h2>
                    <AltContainer stores={{
                        content(props) {
                            return {
                                store: ContentAdminStore,
                                value: ContentAdminStore.getState()
                            }
                        },
                        package(props) {
                            return {
                                store: PackageAdminStore,
                                value: PackageAdminStore.getState().package
                            }
                        }
                    }}>
                        <YoutubePackageList />
                    </AltContainer>
                </section>
            </div>
        )
    }
}

export default ContentControl