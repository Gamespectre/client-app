import React from 'react'
import Radium from 'radium'
import ContentManagement from '../modules/ContentManagement.jsx'
import SeriesList from '../modules/SeriesList.jsx'
import ContentNav from '../components/ContentNav.jsx'
import { RouteHandler } from 'react-router'

@Radium
class Explore extends React.Component {

    render() {
        return (
            <section>
                <nav>
                    <ContentNav />
                </nav>

                <RouteHandler />
            </section>
        )
    }
}

export default Explore