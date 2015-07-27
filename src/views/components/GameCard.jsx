import React from 'react'
import Radium from 'radium'

class GameCard extends React.Component {

    render() {
        let series = typeof this.props.series !== "undefined" ? this.props.series.data.length : 0;
        let creators = typeof this.props.creators !== "undefined" ? this.props.creators.data.length : 0;
        let videos = typeof this.props.videos !== "undefined" ? this.props.videos.data.length : 0;

        return (
            <article className="card game-card">
                <div className="content-wrapper">
                    <div className="image-wrapper">
                        <img src={this.props.image} alt={this.props.title} />
                    </div>
                    <article className="card-content">
                        <header>
                            <h2>{this.props.title}</h2>
                        </header>
                        <nav className="content-card-nav">
                            <a href="#">Creators <i>{creators}</i> &rsaquo;</a>
                            <a href="#">Series <i>{series}</i> &rsaquo;</a>
                            <a href="#">Videos <i>{videos}</i> &rsaquo;</a>
                        </nav>
                    </article>
                </div>
            </article>
        )
    }
}

export default GameCard