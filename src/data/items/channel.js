import mobservable from 'mobservable'
import convertDatamodelData from '../utils/convertDatamodelData'

export default function(channel) {
    let channelData = convertDatamodelData(channel)

    return mobservable.makeReactive({
        name: channelData.name,
        id: channelData.id,
        image: channelData.imageUrl,
        avatar: channelData.avatarUrl,
        published: channelData.birthday,
        subscribers: channelData.subscribers,
        description: channelData.description
    })
}