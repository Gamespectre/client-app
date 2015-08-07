import mobservable from 'mobservable'

const packageParsers = {
    meta(data: Object) {
        return {
            id: data.id,
            channel: data.channel
        }
    },
    user(data: Object) {
        return mobservable.fromJson({
            name: data.name === "Anonymous" ? false : data.name,
            avatar: data.avatar,
            registered: data.created_at,
            googleId: data.google_id,
            userId: data.id,
            roles: data.roles.map(role => {
                return {
                    role: role.name,
                    level: role.level
                }
            })
        })
    },
    game(data: Object) {
        return data.map(game => {
            return mobservable.fromJson({
                id: game.id[0],
                name: game.title[0],
                image: game.imageUrl[0],
                rating: game.rating[0],
                year: game.year[0],
                description: game.description[0],
                franchise: game.franchise[0]
            })
        })
    },
    playlist(data: Object) {
        return data.map(playlist => {
            return mobservable.fromJson({
                name: playlist.name[0],
                channel: playlist.channel[0],
                id: playlist.id[0],
                published: playlist.publishedAt[0].date
            })
        })
    },
    video(data: Object) {
        return data.map(video => {
            return mobservable.fromJson({
                name: video.title[0],
                id: video.id[0],
                channel: video.channel[0],
                description: video.description[0],
                image: video.imageUrl[0],
                order: video.order[0],
                playlist: video.playlist[0],
                published: video.publishedAt[0]
            })
        })
    },
    channel(data: Object) {
        return data.map(channel => {
            return mobservable.fromJson({
                name: channel.name[0],
                id: channel.id[0],
                image: channel.imageUrl[0],
                avatar: channel.avatarUrl[0],
                published: channel.birthday[0],
                subscribers: channel.subscribers[0],
                description: channel.description[0]
            })
        })
    }
}

export default packageParsers