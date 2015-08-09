import React from 'react'
import YoutubeSearchContent from '../../components/admin/YoutubeQueryControl.jsx'
import YoutubePackageList from '../../components/admin/YoutubePackageList.jsx'

class ContentControl extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <section>
                    <YoutubeSearchContent />
                </section>
                <section>
                    <h2>Query results:</h2>
                    <YoutubePackageList />
                </section>
            </div>
        )
    }
}

export default ContentControl