import React from 'react'
import Radium from 'radium'
import connectToStores from 'alt/utils/connectToStores'
import GameStore from '../../stores/GameStore'
import ContentManagement from '../modules/ContentManagement.jsx'
import SeriesList from '../modules/SeriesList.jsx'
import ContentNav from '../components/ContentNav.jsx'
import { explore as style } from '../../style/components/explore'
import { RouteHandler } from 'react-router'

@Radium
class Browse extends React.Component {

    render() {
        return (
            <section>
                <nav>
                    <ContentNav />
                </nav>
                <div className="container" style={ style.wrapper }>
                    <div style={ style.sidebar }>
                        <ContentManagement />
                    </div>
                    <div style={ style.content }>
                        <RouteHandler />
                    </div>
                </div>
            </section>
        )
    }
}

export default Browse