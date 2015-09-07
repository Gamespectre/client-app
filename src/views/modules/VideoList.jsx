import React from 'react'
import ApiClient from '../../api/ApiClient'
import VideoCard from '../components/VideoCard.jsx'
import { resolve } from 'react-resolver'
import { reactiveComponent } from 'mobservable-react'
import InfinityList from '../../decorators/InfinityList'

@InfinityList
@resolve('videos', ({ shouldFetch, page, receiveData, receiveMeta }) => {
    if(shouldFetch()) return ApiClient.fetch('list', 'video', 0, {
        page: page,
        perPage: 20
    }).then(receiveMeta).then(receiveData)
})
@reactiveComponent
class VideoList extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <section className="card-list">
                    {this.props.listData.map(video => {
                        return <VideoCard key={video.id} video={video} />
                    })}
                </section>
            </div>
        )
    }
}

export default VideoList