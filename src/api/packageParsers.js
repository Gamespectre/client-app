const packageParsers = {
    meta(data: Object) {
        return {
            id: data.id,
            channel: data.channel,
            query: data.query
        }
    },
    game(data: Object) {
        return {
            game: data.game.filter(game => game !== false)
            .map(game => {
                return {
                    id: game.id[0],
                    name: game.title[0],
                    image: game.imageUrl[0],
                    rating: game.rating[0],
                    year: game.year[0],
                    description: game.description[0],
                    franchise: game.franchise[0]
                }
            })
        }
    },
    youtube(data: Object) {
        return {
            playlists: data.playlist.filter(playlist => playlist !== false)
            .map(playlist => { return {
                name: playlist.name[0],
                channel: playlist.channel[0],
                id: playlist.id[0],
                published: playlist.publishedAt[0]
            }}),
            videos: data.video.filter(video => video !== false)
            .map(video => { return {
                name: video.title[0],
                id: video.id[0],
                channel: video.channel[0],
                description: video.description[0],
                image: video.imageUrl[0],
                order: video.order[0],
                playlist: video.playlist[0],
                published: video.publishedAt[0]
            }}),
            channels: data.channel.filter(channel => channel !== false)
            .map(channel => { return {
                name: channel.name[0],
                id: channel.id[0],
                image: channel.imageUrl[0],
                avatar: channel.avatarUrl[0],
                birthday: channel.birthday[0],
                subscribers: channel.subscribers[0],
                description: channel.description[0]
            }}),
        }
    }
}

export default packageParsers