import React from 'react'
import AltContainer from 'alt/AltContainer'
import FeaturedContent from '../modules/FeaturedContent.jsx'
import GenericList from '../modules/GenericList.jsx'
import axios from 'axios'
import EventsListener from '../../api/PusherClient'

class Front extends React.Component {

    render() {
        return (
            <div>
                <FeaturedContent />

                <AltContainer>
                    <GenericList />
                </AltContainer>

                <AltContainer>
                    <GenericList />
                </AltContainer>
            </div>
        )
    }
}

export default Front