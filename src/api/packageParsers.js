const packageParsers = {
    game(data: Object) {
        return {
            id: data.id,
            channel: data.event.channel,
            query: data.query,
            games: data.game.map(game => {
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
    }
}

export default packageParsers