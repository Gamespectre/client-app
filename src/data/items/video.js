import mobservable from 'mobservable'
import convertDatamodelData from '../utils/convertDatamodelData'

export default function(video) {
    let videoData = convertDatamodelData(video)

    return mobservable.makeReactive({
        name: videoData.title,
        id: videoData.id,
        channel: videoData.channel,
        description: videoData.description,
        image: videoData.imageUrl,
        order: videoData.order,
        playlist: videoData.playlist,
        published: videoData.publishedAt
    })
}