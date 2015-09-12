import React from 'react'
import { Link } from 'react-router'
import GamePage from '../../data/models/GamePage'
import slug from 'slug'

class VideoCard extends React.Component {

    render() {

        return (
            <article className="card video-card">
                <Link to={`/videos/${slug(this.props.video.title, {lower: true}) }`}>
                    <div className="content-wrapper">
                        <div className="image-wrapper">
                            <img src={this.props.video.image} alt={this.props.video.title} />
                        </div>
                        <article className="card-content">
                            <header>
                                <h2>{this.props.video.title}</h2>
                            </header>
                        </article>
                    </div>
                </Link>
            </article>
        )
    }
}

export default VideoCard