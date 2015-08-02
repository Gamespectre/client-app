import React from 'react'
import AltContainer from 'alt/AltContainer'
import FeaturedContent from '../modules/FeaturedContent.jsx'
import GenericList from '../modules/GenericList.jsx'
import axios from 'axios'
import { Link } from 'react-router'
import EventsListener from '../../api/PusherClient'

class Front extends React.Component {

    render() {
        return (
            <div>
                <Link to="gamepage" params={{ game: 1 }}>Game 1</Link>
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