import mobservable from 'mobservable'
import convertDatamodelData from '../utils/convertDatamodelData'

export default function(playlist) {
    let playlistData = convertDatamodelData(playlist)

    return mobservable.makeReactive({
        name: playlistData.name,
        channel: playlistData.channel,
        id: playlistData.id,
        published: playlistData.publishedAt.date
    })
}