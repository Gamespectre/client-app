import React from 'react'
import ContentManagement from '../modules/ContentManagement.jsx'
import SeriesList from '../modules/SeriesList.jsx'
import ContentNav from '../components/ContentNav.jsx'

class Explore extends React.Component {

    render() {
        return (
            <section>
                <nav>
                    <ContentNav />
                </nav>
                { this.props.children }
            </section>
        )
    }
}

export default Explore